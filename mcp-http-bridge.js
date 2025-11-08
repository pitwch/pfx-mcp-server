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
 *   PROFFIX_USERNAME
 *   PROFFIX_PASSWORD
 *   PROFFIX_URL
 *   PROFFIX_PORT
 *   PROFFIX_DATABASE
 */

const https = require('https');
const http = require('http');
const readline = require('readline');

// Configuration
const SERVER_URL = process.argv[2] || process.env.MCP_SERVER_URL || 'https://mcp.pfx.ch/api/server';

// Proffix credentials from environment
const PROFFIX_USERNAME = process.env.PROFFIX_USERNAME || '';
const PROFFIX_PASSWORD = process.env.PROFFIX_PASSWORD || '';
const PROFFIX_URL = process.env.PROFFIX_URL || '';
const PROFFIX_PORT = process.env.PROFFIX_PORT || '';
const PROFFIX_DATABASE = process.env.PROFFIX_DATABASE || '';

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

// Log to stderr (stdout is reserved for JSON-RPC)
function log(message) {
  console.error(`[MCP Bridge] ${message}`);
}

// Send JSON-RPC response to stdout
function sendResponse(response) {
  process.stdout.write(JSON.stringify(response) + '\n');
}

// Make HTTP request to MCP server
function makeRequest(jsonRpcRequest, callback) {
  const postData = JSON.stringify(jsonRpcRequest);
  
  const options = {
    hostname: serverUrl.hostname,
    port: serverUrl.port || (isHttps ? 443 : 80),
    path: serverUrl.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'X-Proffix-Username': PROFFIX_USERNAME,
      'X-Proffix-Password': PROFFIX_PASSWORD,
      'X-Proffix-Url': PROFFIX_URL,
      'X-Proffix-Port': PROFFIX_PORT,
      'X-Proffix-Database': PROFFIX_DATABASE
    }
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
  
  log(`Received ${isNotification ? 'notification' : 'request'}: ${request.method || 'unknown'} (id: ${request.id})`);

  // Notifications don't get responses - just forward and ignore
  if (isNotification) {
    makeRequest(request, (err, response) => {
      if (err) {
        log(`Notification error (ignored): ${err.message}`);
      } else {
        log(`Notification processed: ${request.method}`);
      }
    });
    return;
  }

  // Forward request to HTTP MCP server
  makeRequest(request, (err, response) => {
    if (err) {
      log(`Error: ${err.message}`);
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
      log(`Sending response for: ${request.method} (id: ${response.id})`);
      sendResponse(response);
    }
  });
});

// Handle process termination
process.on('SIGINT', () => {
  log('Bridge shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Bridge shutting down...');
  process.exit(0);
});

log(`MCP HTTP Bridge started`);
log(`Server: ${SERVER_URL}`);
log(`Proffix User: ${PROFFIX_USERNAME || '(not set)'}`);
log(`Ready for JSON-RPC requests via stdio...`);
