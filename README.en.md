# pfx MCP Server for Forterro Proffix Px5

[Deutsch](README.md) · **English**

Client bridge and install packages for [pfx MCP](https://mcp.pfx.ch). This repository is not the server. The bridge speaks stdio to the AI client and forwards JSON-RPC to the hosted server:

```text
AI client → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → your Proffix REST API
```

**An API key is required.** Every call also needs your Proffix REST credentials (URL, port, database, user, password). Neither belongs in git.

Bridge version: **1.1.9** · Node.js **18+** · License: MIT

## Requirements

1. Request an API key: [mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html) (the key only, no `Bearer` prefix).
2. A reachable Proffix Px5 REST API (port `11011` is typical).
3. Node.js 18 or newer, unless you only install the prebuilt MCPB bundle in Claude Desktop.

## Install

### Claude Desktop (MCPB)

1. Download [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb).
2. Claude Desktop: Settings → Extensions → Advanced settings → Install extension… → select the `.mcpb` file.
3. Fill in the API key and the Proffix fields.
4. Restart Claude. Try: “Show addresses in Zurich.”

This is a local desktop extension, not a listing in the public Claude Directory.

### Claude Code (self-hosted marketplace)

```bash
claude plugin marketplace add pitwch/pfx-mcp-server
claude plugin install pfx-mcp-server@pfx-mcp-server
```

Claude Code prompts for the API key (required, masked) and the Proffix fields. The bridge sends `Authorization: Bearer <key>` to `https://mcp.pfx.ch/api/server`.

### Other MCP clients (Cursor, Gemini CLI, …)

Use the bridge from this repo (or save [mcp-http-bridge.js](mcp-http-bridge.js)):

```json
{
  "mcpServers": {
    "pfx-mcp": {
      "command": "node",
      "args": ["C:\\path\\to\\mcp-http-bridge.js", "https://mcp.pfx.ch/api/server"],
      "env": {
        "HTTP_AUTHORIZATION": "Bearer YOUR_API_KEY",
        "PROFFIX_USERNAME": "rest-user",
        "PROFFIX_PASSWORD": "rest-password",
        "PROFFIX_URL": "https://your-proffix.example",
        "PROFFIX_PORT": "11011",
        "PROFFIX_DATABASE": "YOUR_DB",
        "RESPONSE_FORMAT": "json"
      }
    }
  }
}
```

On macOS/Linux, change the path in `args`. Client setup: [mcp.pfx.ch/ai-clients.html](https://mcp.pfx.ch/ai-clients.html).

Login token: omit `PROFFIX_USERNAME` and put the token in `PROFFIX_PASSWORD`.

## Configuration

| Variable | Required | Meaning |
| --- | --- | --- |
| `HTTP_AUTHORIZATION` | yes | `Bearer` plus API key |
| `PROFFIX_URL` | yes | Proffix host |
| `PROFFIX_PORT` | yes | REST port, usually `11011` |
| `PROFFIX_DATABASE` | yes | Tenant database |
| `PROFFIX_USERNAME` | yes* | REST user |
| `PROFFIX_PASSWORD` | yes | Password or login token |
| `RESPONSE_FORMAT` | no | `json` (default) or `toon` |

\* Leave empty when using a login token.

## Response format

- `json`: Proffix JSON, the default.
- `toon`: a more compact rendering aimed at models.

Set `RESPONSE_FORMAT` for every call. A single tool call can pass `format` and override the env var for that call.

## What the server does

The hosted endpoint speaks MCP over JSON-RPC (`initialize`, `tools/list`, `tools/call`). Curated `px_*` tools cover common workflows (addresses, articles, stock, debtors/creditors, orders, lists). Legacy tools such as `proffix_search_endpoints` and `proffix_call_endpoint` find and call further REST paths.

Examples:

- “Show open debtors.”
- “Search articles with laptop in the name.”
- “Which addresses changed this week?”

List numbers (`listeNr`) are tenant-specific. The model should resolve them with the search tools, not invent them.

## Security

- The API key and Proffix credentials are sent as HTTPS headers to `mcp.pfx.ch` on each request. That server then calls your Proffix REST API.
- Do not put the key or password in this repo, in tickets, or in the chat.
- The bridge writes a debug log to `%TEMP%\pfx-mcp-bridge.log` (macOS/Linux: the temp directory, file `pfx-mcp-bridge.log`).
- Tool results are visible to the client’s model provider. This is not a local offline model.
- Desktop install warning: [SECURITY_INFO.md](SECURITY_INFO.md).

## ChatGPT plugin (ZIP)

Package with logo, icon, skill, and the MCP reference. No `.app.json` — the directory rejects app references inside the ZIP. An API key is still required.

https://github.com/pitwch/pfx-mcp-server/raw/main/downloads/pfx-proffix-chatgpt.zip

## Operations and support

- Product site: [https://mcp.pfx.ch](https://mcp.pfx.ch)
- API key: [request-api-key.html](https://mcp.pfx.ch/request-api-key.html)
- Version/status: [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)
- Debug examples: [https://mcp.pfx.ch/debug.html](https://mcp.pfx.ch/debug.html)
- MCP Registry: package `ch.pfx/mcp-server` on [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- Support: [support@pfx.ch](mailto:support@pfx.ch) · [mcp.pfx.ch/support](https://mcp.pfx.ch/support)

Build the MCPB locally: [README-BUILD.md](README-BUILD.md).

## License

MIT. See [LICENSE](LICENSE).

You still need your own access to the Forterro Proffix Px5 REST API.
