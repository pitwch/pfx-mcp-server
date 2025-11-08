#!/usr/bin/env node

/**
 * MCP HTTP Bridge for Claude Desktop
 * 
 * This bridge allows Claude Desktop (stdio transport) to connect to
 * HTTP-based MCP servers like pfx-mcp.
 * 
 * Usage:
 *   node mcp-http-bridge.js <server-url>
 * 
 * Environment variables for authentication:
 *   HTTP_AUTHORIZATION  - API Key (e.g., "Bearer pfx_abc123...")
 *   PROFFIX_USERNAME    - Proffix username
 *   PROFFIX_PASSWORD    - Proffix password
 *   PROFFIX_URL         - Proffix server URL
 *   PROFFIX_PORT        - Proffix server port
 *   PROFFIX_DATABASE    - Proffix database name
 */

const https = require('https');
const http = require('http');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration
const SERVER_URL = process.argv[2] || process.env.MCP_SERVER_URL || 'https://mcp.pfx.ch/api/server';

// Proffix credentials from environment
const PROFFIX_USERNAME = process.env.PROFFIX_USERNAME || '';
const PROFFIX_PASSWORD = process.env.PROFFIX_PASSWORD || '';
const PROFFIX_URL = process.env.PROFFIX_URL || '';
const PROFFIX_PORT = process.env.PROFFIX_PORT || '';
const PROFFIX_DATABASE = process.env.PROFFIX_DATABASE || '';

// API Key from environment (Authorization header)
const HTTP_AUTHORIZATION = process.env.HTTP_AUTHORIZATION || '';

// Setup file logging
const LOG_FILE = path.join(os.tmpdir(), 'pfx-mcp-bridge.log');
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });

// Parse server URL
const serverUrl = new URL(SERVER_URL);
const isHttps = serverUrl.protocol === 'https:';
const httpModule = isHttps ? https : http;

// Setup readline for JSON-RPC over stdio
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Log to stderr (stdout is reserved for JSON-RPC) and to file
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logMsg = `${timestamp} [MCP Bridge] [${level}] ${message}`;
  console.error(logMsg);
  logStream.write(logMsg + '\n');
}

// Send JSON-RPC response to stdout
function sendResponse(response) {
  try {
    const responseStr = JSON.stringify(response) + '\n';
    process.stdout.write(responseStr);
  } catch (err) {
    log(`Error sending response: ${err.message}`, 'error');
  }
}

// Make HTTP request to MCP server
function makeRequest(jsonRpcRequest, callback) {
  const postData = JSON.stringify(jsonRpcRequest);
  
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'X-Proffix-Username': PROFFIX_USERNAME,
    'X-Proffix-Password': PROFFIX_PASSWORD,
    'X-Proffix-Url': PROFFIX_URL,
    'X-Proffix-Port': PROFFIX_PORT,
    'X-Proffix-Database': PROFFIX_DATABASE
  };

  // Add Authorization header if provided
  if (HTTP_AUTHORIZATION) {
    headers['Authorization'] = HTTP_AUTHORIZATION;
  }

  const options = {
    hostname: serverUrl.hostname,
    port: serverUrl.port || (isHttps ? 443 : 80),
    path: serverUrl.pathname,
    method: 'POST',
    headers: headers
  };

  const req = httpModule.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // Check HTTP status code
      if (res.statusCode !== 200) {
        callback(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 200)}`));
        return;
      }

      try {
        const response = JSON.parse(data);
        
        // Ensure response has proper JSON-RPC structure
        if (!response.jsonrpc) {
          response.jsonrpc = '2.0';
        }
        
        // If server returned an error without proper JSON-RPC format, wrap it
        if (response.error && !response.id) {
          callback(new Error(response.error.message || JSON.stringify(response.error)));
          return;
        }
        
        callback(null, response);
      } catch (err) {
        // If response is not JSON, treat as error
        callback(new Error(`Invalid JSON response: ${data.substring(0, 200)}`));
      }
    });
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.setTimeout(60000, () => {
    req.destroy();
    callback(new Error('Request timeout after 60 seconds'));
  });

  req.write(postData);
  req.end();
}

// Handle incoming JSON-RPC requests from stdin
rl.on('line', (line) => {
  if (!line.trim()) return; // Skip empty lines
  
  messageCount++;
  
  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    log(`Failed to parse request: ${err.message}`);
    sendResponse({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error'
      }
    });
    return;
  }

  // Check if this is a notification (no id field)
  const isNotification = request.id === undefined || request.id === null;

  // Handle notifications/initialized specially - don't forward to server
  if (isNotification && request.method === 'notifications/initialized') {
    return;
  }

  // Notifications don't get responses - just forward and ignore
  if (isNotification) {
    makeRequest(request, (err) => {
      if (err) {
        log(`Notification error: ${err.message}`, 'error');
      }
    });
    return;
  }

  // Forward request to HTTP MCP server
  makeRequest(request, (err, response) => {
    if (err) {
      log(`Request error for ${request.method}: ${err.message}`, 'error');
      sendResponse({
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32603,
          message: `Bridge error: ${err.message}`
        }
      });
    } else {
      // Ensure response has the correct id from the request
      if (response.id === undefined || response.id === null) {
        response.id = request.id;
      }
      
      // Upgrade protocol version for initialize response to match client expectations
      if (request.method === 'initialize' && response.result && response.result.protocolVersion) {
        const clientVersion = request.params?.protocolVersion;
        const serverVersion = response.result.protocolVersion;
        
        // If client expects newer version, upgrade the response
        if (clientVersion && clientVersion > serverVersion) {
          response.result.protocolVersion = clientVersion;
          
          // Normalize capabilities for newer protocol versions
          if (response.result.capabilities) {
            const caps = response.result.capabilities;
            if (caps.prompts === true) caps.prompts = {};
            if (caps.tools === true) caps.tools = {};
          }
        }
      }
      
      sendResponse(response);
    }
  });
});

// Handle process termination
process.on('SIGINT', () => {
  logStream.end();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logStream.end();
  process.exit(0);
});

process.stdin.on('end', () => {
  logStream.end();
  process.exit(0);
});

// Handle unexpected errors
process.on('uncaughtException', (err) => {
  log(`Uncaught exception: ${err.message}`, 'error');
  log(err.stack, 'error');
  logStream.end();
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`Unhandled rejection: ${reason}`, 'error');
  logStream.end();
  process.exit(1);
});

log(`MCP HTTP Bridge started`);
log(`Server: ${SERVER_URL}`);
log(`Log file: ${LOG_FILE}`);

// Keep the process alive
process.stdin.resume();
let messageCount = 0;
