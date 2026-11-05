# pfx MCP Server for Forterro Proffix Px5

[Deutsch](README.md) · **English**

Connect Claude, Cursor, and other assistants to your Proffix Px5.

```text
Assistant → pfx MCP → your Proffix
```

You need an [API key](https://mcp.pfx.ch/request-api-key.html) and the REST login for your Proffix (address, port, database, user, password).

Version **1.1.9** · Node.js **18+** · [MIT](LICENSE)

## Install

### Claude Desktop

1. Download [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb).
2. In Claude: Settings → Extensions → Advanced settings → Install extension… → choose the file.
3. Enter the API key and your Proffix login.
4. Restart Claude. Try: “Show addresses in Zurich.”

### Claude Code

```bash
claude plugin marketplace add pitwch/pfx-mcp-server
claude plugin install pfx-mcp-server@pfx-mcp-server
```

Claude asks for the API key and the Proffix login.

### Cursor, Gemini CLI, and other clients

Use [mcp-http-bridge.js](mcp-http-bridge.js) from this repo. More clients: [mcp.pfx.ch/ai-clients.html](https://mcp.pfx.ch/ai-clients.html).

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

On macOS and Linux, change the path in `args`. With a login token, leave `PROFFIX_USERNAME` empty and put the token in `PROFFIX_PASSWORD`.

### ChatGPT

Plugin package: [pfx-proffix-chatgpt.zip](https://github.com/pitwch/pfx-mcp-server/raw/main/downloads/pfx-proffix-chatgpt.zip)

## Credentials

| Field | Meaning |
| --- | --- |
| API key | From [mcp.pfx.ch](https://mcp.pfx.ch/request-api-key.html), prefixed with `Bearer ` |
| `PROFFIX_URL` | Address of your Proffix |
| `PROFFIX_PORT` | REST port, usually `11011` |
| `PROFFIX_DATABASE` | Database / tenant |
| `PROFFIX_USERNAME` | User |
| `PROFFIX_PASSWORD` | Password or login token |
| `RESPONSE_FORMAT` | `json` or `toon` (optional, default `json`) |

`toon` is a shorter rendering of the same data. A single call can set `format` on its own.

## Examples

- “Show open debtors.”
- “Search articles with laptop in the name.”
- “Which addresses changed this week?”

That covers addresses, articles, stock, debtors, creditors, orders, and lists, among other things.

## Help

- [mcp.pfx.ch](https://mcp.pfx.ch)
- [Request an API key](https://mcp.pfx.ch/request-api-key.html)
- [Test the connection](https://mcp.pfx.ch/debug.html)
- [Server version](https://mcp.pfx.ch/api/version)
- [support@pfx.ch](mailto:support@pfx.ch)

Claude Desktop may show a warning during install. [SECURITY_INFO.md](SECURITY_INFO.md) explains it. The bridge can write a log to `%TEMP%\pfx-mcp-bridge.log`.

Build the MCPB yourself: [README-BUILD.md](README-BUILD.md).
