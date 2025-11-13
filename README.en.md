# pfx MCP Server

**[🇩🇪 Deutsch](README.md) | 🇬🇧 English**

**Model Context Protocol Server for Forterro Proffix Px5 ERP**

The universal interface for AI integration with your Proffix Px5 ERP

Connect AI assistants (Claude, ChatGPT, Gemini) to your Proffix Px5 via standardized MCP protocol.

**JSON-RPC 2.0 Transport • Parameter-based Auth • Prepared Proffix Endpoints**

## 🌟 What is the Model Context Protocol (MCP)?

Model Context Protocol (MCP) is an open standard by Anthropic for secure AI integration. AI assistants access your systems directly - without manual data copies or screenshots.

**Without MCP:** "Show me all open invoices" → You must open Proffix, export data, copy it into the AI

**With MCP:** "Show me all open invoices" → The AI accesses Proffix directly and delivers the answer

- **Real-time Access:** AI works with current data from your systems
- **Security:** No data is stored in the AI - only temporary access
- **Automation:** AI can perform complex tasks across multiple systems
- **Natural Language:** No SQL or API knowledge required
- **Standardized:** Works with all MCP-compatible AI assistants

## 📋 What is pfx MCP?

pfx MCP is the first MCP Server for Forterro Proffix Px5. Connect AI assistants like Claude, ChatGPT and Gemini to your ERP. Access data, create reports and automate workflows - directly via natural language.

- **Proffix Functionality** directly via MCP Tools
- **JSON-RPC 2.0 Transport** for all MCP clients
- **Free API Key** (Beta)
- **Claude, ChatGPT, Gemini Ready**

**Officially listed in the MCP Registry:**
- 📦 Package: `ch.pfx/mcp-server`
- 🔗 Registry: [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- 💻 GitHub: [github.com/pitwch/pfx-mcp-server](https://github.com/pitwch/pfx-mcp-server)
- ✅ Status: Active • Version 1.0.0 • Published 2025-11-08

## 💡 Practical Use Cases

### 📊 Intelligent Data Queries
**Example:** "Show me all open invoices"

The AI accesses your Proffix data directly and delivers structured results - without SQL or API knowledge.

### 🔍 Complex Searches
**Example:** "Search for articles with 'Laptop' in the name and price under 1000 CHF"

Natural language queries are automatically converted into precise API calls.

### 📈 Automatic Reports
**Example:** "Create a report on the top 10 customers by revenue"

The AI aggregates data, creates analyses and formats results professionally.

### 🔔 Change Tracking
**Example:** "Which addresses changed this week?"

Time-based queries and change analyses in real-time.

### 💼 More Use Cases
- **Inventory Management:** "Show me all articles with stock below 10"
- **Customer Analysis:** "Analyze the revenue development of customer 1001"
- **Workflow Automation:** "Create a new address for company XY"
- **Endpoint Discovery:** "Which API endpoints are available for orders?"
- **Multi-System Queries:** "Compare Proffix data with our CRM"

## 🚀 Quick Start

### Option 1: One-Click Installation (Recommended) 🎯

**For Claude Desktop Users - Easiest Installation!**

The fastest method - no manual configuration needed!

1. **Get API Key**  
   Visit [request-api-key.html](https://mcp.pfx.ch/request-api-key.html) and request your free key (via email)

2. **Download MCPB Bundle**  
   [Download pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb)

3. **Install**  
   In Claude Desktop: Settings → Extensions → Advanced Settings (Extension Developer section) → Install Extension… → select the `.mcpb` file and follow instructions

4. **Enter Credentials**  
   API Key + your Proffix Px5 Credentials (Username, Password, URL, Port, Database)

5. **Done!**  
   Restart Claude and test: *"Show me all addresses from Zurich from Proffix Px5"*

---

### Option 2: Manual Installation (Advanced) ⚙️

**For other MCP clients or advanced configuration**

For other MCP clients (Cursor, Windsurf, Gemini CLI, etc.) or if you want to manage the configuration yourself:

1. **Request API Key**  
   [request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **Download Bridge Script**  
   Download [mcp-http-bridge.txt](https://mcp.pfx.ch/bridge/mcp-http-bridge.txt) and rename to `mcp-http-bridge.js`

3. **Open Config File**  
   Depending on client:
   - Claude: `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
   - Cursor/Windsurf: See [AI Client Setup](https://mcp.pfx.ch/ai-clients.html)

4. **Add Server**  
   See example config below:

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

5. **Restart Client and Test**  
   Ask your AI assistant: *"Show me all addresses from Proffix"*

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

### Authentication
- **API Key** for access control (free during beta)
- **Proffix Credentials** as HTTP headers (encrypted transmission)
- **No Data Storage** on MCP server
- **Parameter-based Auth** without sessions
- Credentials are transmitted with each request and not stored

### Best Practices
- Always use HTTPS for communication
- Never store credentials in client code
- Implement rate limiting on client side
- Monitor API access regularly
- Use strong passwords for Proffix API users

### Server Security
- Comprehensive .htaccess security rules
- Protection of sensitive files and configurations
- HTTPS encryption recommended

## 🌐 Remote Server

The pfx MCP Server runs as a **hosted service** at:
```
https://mcp.pfx.ch/api/server
```

**Transport:** JSON-RPC 2.0 via HTTP  
**Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 🔌 Model Context Protocol API

The pfx MCP Server implements the standardized Model Context Protocol via JSON-RPC 2.0:

### MCP Methods
- **initialize** - Handshake between client and server. Exchanges capabilities and protocol version.
- **tools/list** - Lists all available Proffix operations. Requires authentication.
- **tools/call** - Executes a Proffix operation. Parameters are passed in `arguments`.

### Available Proffix Tools
- `proffix_search_endpoints` - Fuzzy search across 120+ endpoints
- `proffix_call_endpoint` - Direct endpoint call
- `proffix_describe_endpoint` - Endpoint documentation
- All specific Proffix API endpoints (Addresses, Articles, Orders, etc.)

**Server URL:** `https://mcp.pfx.ch/api/server`

[🔧 Test Examples & Debugging](https://mcp.pfx.ch/debug.html)

## 💡 Example Queries

### General Queries
```
"Show me all open invoices"
"Search for articles with 'Laptop' in the name"
"Which addresses changed this week?"
"Create a report on sales by customer"
```

### Department-Specific Examples
- **Accounting:** "Show all unpaid invoices older than 30 days"
- **Sales:** "List all quotes from Q4 2024 with status 'Open'"
- **Purchasing:** "Which orders are overdue?"
- **Controlling:** "Create a revenue overview by product groups"
- **Support:** "Find all service cases for customer XY"
- **Development:** "Document all available Proffix endpoints"

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
