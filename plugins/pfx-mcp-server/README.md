# Proffix Px5 (pfx-mcp) — Claude Code plugin

Connects Claude Code to Forterro Proffix Px5 through the HTTP bridge in this repository. Calls go to `https://mcp.pfx.ch/api/server`.

A **pfx MCP API key is required**. The plugin prompts for it on enable (`userConfig.api_key`, sensitive, required) and sends `Authorization: Bearer <key>`. Proffix URL, port, database, username, and password are required as well. Request a key at https://mcp.pfx.ch/request-api-key.html. The plugin stores no key in git.

Privacy: https://mcp.pfx.ch/datenschutz.html · Terms: https://mcp.pfx.ch/nutzungsbedingungen.html · Support: https://mcp.pfx.ch/#kontakt

## Install

```bash
claude plugin marketplace add pitwch/pfx-mcp-server
claude plugin install pfx-mcp-server@pfx-mcp-server
```

Node.js 18+ must be on PATH. This is a Claude Code marketplace, not the official Claude Directory.
