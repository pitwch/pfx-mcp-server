# pfx MCP Server

**[🇩🇪 Deutsch](README.md) | 🇬🇧 English**

**Model Context Protocol Server for Forterro Proffix Px5 ERP**

Connect AI assistants (Claude, ChatGPT, Gemini) to your Proffix Px5 via standardized MCP protocol.

## 🌟 Features

- **Proffix Functionality** directly via MCP Tools
- **JSON-RPC 2.0 Transport** for all MCP clients
- **Secure Authentication** (API Key + Proffix Credentials)
- **Zero Installation** - Remote server, no local installation needed

## 🚀 Quick Start

### Option 1: One-Click Installation (Recommended) 🎯

**For Claude Desktop Users - Easiest Installation!**

1. **Request API Key**  
   Get your free API key: [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **Download MCPB Bundle**  
   Download: [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb)

3. **Install**  
   - Double-click the `.mcpb` file
   - Claude Desktop automatically opens the installation dialog
   - Enter your Proffix credentials (API Key, Username, Password, URL, Port, Database)
   - Done! ✅

4. **Restart Claude Desktop**  
   Ask Claude: *"Show me all addresses from Proffix"*

---

### Option 2: Manual Installation (Advanced) ⚙️

**For other MCP clients or advanced configuration**

1. **Request API Key**  
   Get your free API key: [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **Download MCP Bridge Script**  
   Download: [mcp-http-bridge.js](https://mcp.pfx.ch/bridge/mcp-http-bridge.txt) (rename to `.js`)

3. **Configure Claude Desktop**  
   `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or  
   `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "pfx-mcp": {
      "command": "node",
      "args": ["C:\\mcp\\mcp-http-bridge.js", "https://mcp.pfx.ch/api/server"],
      "env": {
        "HTTP_AUTHORIZATION": "Bearer YOUR_API_KEY",
        "PROFFIX_USERNAME": "your-username",
        "PROFFIX_PASSWORD": "your-password",
        "PROFFIX_URL": "https://your-proffix.com",
        "PROFFIX_PORT": "11011",
        "PROFFIX_DATABASE": "your-db"
      }
    }
  }
}
```

4. **Restart Claude Desktop**  
   Ask Claude: *"Show me all addresses from Proffix"*

## 📚 Documentation

Complete setup guides for all AI clients:
- **[Main Documentation](https://mcp.pfx.ch)**
- **[AI Client Setup](https://mcp.pfx.ch/ai-clients.html)** (Claude, ChatGPT, Gemini, Cursor, Windsurf, Continue.dev)
- **[Testing & Debug](https://mcp.pfx.ch/debug.html)**

## 🔧 Supported MCP Clients

- ✅ Claude Desktop
- ✅ Cursor IDE
- ✅ Windsurf IDE
- ✅ Continue.dev (VS Code/JetBrains)
- ✅ Gemini CLI
- ⚡ ChatGPT (experimental)
- ✅ Custom Clients (via MCP SDK)

## 🔒 Security

- API Key for access control (free during beta)
- Proffix credentials as HTTP headers (encrypted transmission)
- No data storage on MCP server
- Parameter-based auth without sessions

## 🌐 Remote Server

The pfx MCP Server runs as a **hosted service** at:
```
https://mcp.pfx.ch/api/server
```

**Transport:** JSON-RPC 2.0 via HTTP  
**Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 📋 Available Tools

- `proffix_search_endpoints` - Fuzzy search across 120+ endpoints
- `proffix_call_endpoint` - Direct endpoint call
- `proffix_describe_endpoint` - Endpoint documentation
- All specific Proffix API endpoints (Addresses, Articles, Orders, etc.)

## 💡 Example Queries

```
"Show me all open invoices"
"Search for articles with 'Laptop' in the name"
"Which addresses changed this week?"
"Create a report on sales by customer"
```

## 🔗 Links

- **Website:** [https://mcp.pfx.ch](https://mcp.pfx.ch)
- **API Key:** [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)
- **Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For questions: [https://mcp.pfx.ch/#kontakt](https://mcp.pfx.ch/#kontakt)

---

**Note:** Requires access to the Forterro Proffix Px5 REST API.
