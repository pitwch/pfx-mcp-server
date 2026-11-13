#!/usr/bin/env node

/**
 * MCP HTTP Bridge
 *
 * Bridges Claude Desktop / other stdio MCP clients to an HTTP MCP server.
 *
 * Usage:
 *   node mcp-http-bridge.js <server-url>
 *
 * Environment:
 *   HTTP_AUTHORIZATION  - API key (e.g. "Bearer pfx_...")
 *   PROFFIX_USERNAME    - Proffix username
 *   PROFFIX_PASSWORD    - Proffix password or login token
 *   PROFFIX_URL         - Proffix server URL
 *   PROFFIX_PORT        - Proffix REST port
 *   PROFFIX_DATABASE    - Proffix database name
 *   RESPONSE_FORMAT     - Default format: json | toon (optional)
 *   PFX_MCP_LOG_FILE    - Optional path for file logging (stderr always on)
 *
 * Per-call format can still override RESPONSE_FORMAT via tool args/params.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const config = {
  serverUrl: process.argv[2] || process.env.MCP_SERVER_URL || 'https://mcp.pfx.ch/api/server',
  authorization: process.env.HTTP_AUTHORIZATION || '',
  username: process.env.PROFFIX_USERNAME || '',
  password: process.env.PROFFIX_PASSWORD || '',
  url: process.env.PROFFIX_URL || '',
  port: process.env.PROFFIX_PORT || '',
  database: process.env.PROFFIX_DATABASE || '',
  responseFormat: process.env.RESPONSE_FORMAT || '',
  logFile: process.env.PFX_MCP_LOG_FILE || '',
  timeoutMs: 60_000
};

const logStream = config.logFile
  ? fs.createWriteStream(path.resolve(config.logFile), { flags: 'a' })
  : null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function log(message, level = 'info') {
  const line = `${new Date().toISOString()} [MCP Bridge] [${level}] ${message}`;
  console.error(line);
  if (logStream) logStream.write(line + '\n');
}

function closeLog() {
  if (logStream) logStream.end();
}

function sendResponse(response) {
  try {
    process.stdout.write(JSON.stringify(response) + '\n');
  } catch (err) {
    log(`Error sending response: ${err.message}`, 'error');
  }
}

function buildHeaders(body) {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  };

  const optional = {
    Authorization: config.authorization,
    'X-Proffix-Username': config.username,
    'X-Proffix-Password': config.password,
    'X-Proffix-Url': config.url,
    'X-Proffix-Port': config.port,
    'X-Proffix-Database': config.database,
    'X-Response-Format': config.responseFormat
  };

  for (const [key, value] of Object.entries(optional)) {
    if (value) headers[key] = value;
  }

  return headers;
}

async function makeRequest(jsonRpcRequest) {
  const body = JSON.stringify(jsonRpcRequest);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const res = await fetch(config.serverUrl, {
      method: 'POST',
      headers: buildHeaders(body),
      body,
      signal: controller.signal
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text.substring(0, 200)}`);
    }

    let response;
    try {
      response = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
    }

    if (!response.jsonrpc) {
      response.jsonrpc = '2.0';
    }

    if (response.error && (response.id === undefined || response.id === null)) {
      throw new Error(response.error.message || JSON.stringify(response.error));
    }

    return response;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timeout after 60 seconds');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * MCP protocolVersion values are ISO dates (e.g. 2024-11-05).
 * Lexicographic string compare is correct for that format.
 */
function normalizeInitializeResponse(request, response) {
  if (request.method !== 'initialize' || !response.result?.protocolVersion) {
    return response;
  }

  const clientVersion = request.params?.protocolVersion;
  const serverVersion = response.result.protocolVersion;

  if (clientVersion && clientVersion > serverVersion) {
    response.result.protocolVersion = clientVersion;
    const caps = response.result.capabilities;
    if (caps) {
      if (caps.prompts === true) caps.prompts = {};
      if (caps.tools === true) caps.tools = {};
    }
  }

  return response;
}

rl.on('line', async (line) => {
  if (!line.trim()) return;

  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    log(`Failed to parse request: ${err.message}`);
    sendResponse({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error' }
    });
    return;
  }

  const isNotification = request.id === undefined || request.id === null;

  if (isNotification && request.method === 'notifications/initialized') {
    return;
  }

  if (isNotification) {
    try {
      await makeRequest(request);
    } catch (err) {
      log(`Notification error: ${err.message}`, 'error');
    }
    return;
  }

  try {
    let response = await makeRequest(request);
    if (response.id === undefined || response.id === null) {
      response.id = request.id;
    }
    response = normalizeInitializeResponse(request, response);
    sendResponse(response);
  } catch (err) {
    log(`Request error for ${request.method}: ${err.message}`, 'error');
    sendResponse({
      jsonrpc: '2.0',
      id: request.id,
      error: { code: -32603, message: `Bridge error: ${err.message}` }
    });
  }
});

function shutdown(code = 0) {
  closeLog();
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.stdin.on('end', () => shutdown(0));

process.on('uncaughtException', (err) => {
  log(`Uncaught exception: ${err.message}`, 'error');
  log(err.stack, 'error');
  shutdown(1);
});

process.on('unhandledRejection', (reason) => {
  log(`Unhandled rejection: ${reason}`, 'error');
  shutdown(1);
});

log('MCP HTTP Bridge started');
log(`Server: ${config.serverUrl}`);
if (config.logFile) log(`Log file: ${path.resolve(config.logFile)}`);

process.stdin.resume();
