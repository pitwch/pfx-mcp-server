# Proffix Px5 (pfx-mcp) — Remote connector

Connects Claude to Forterro Proffix Px5 through the hosted remote MCP connector
on https://mcp.pfx.ch — no local process, no credentials in the plugin.

This is the variant for the official Claude connector directory (claude.ai). It
avoids the local-bridge findings MCP_FORWARDS_CREDENTIAL_ENV and the verified-org
requirement, because there is no command and no env that carries secrets.

Authentication is OAuth 2.1 (Dynamic Client Registration + PKCE). On first use,
Claude opens the secure connect page on mcp.pfx.ch, where you sign in with your pfx
MCP API key and your Proffix REST credentials. The plugin itself stores nothing.

Privacy: https://mcp.pfx.ch/privacy / Terms: https://mcp.pfx.ch/terms / Support: https://mcp.pfx.ch/support

## .mcp.json

    {
      "mcpServers": {
        "pfx-proffix": { "type": "http", "url": "https://mcp.pfx.ch/api/chatgpt/mcp" }
      }
    }

No command, no args, no env — Claude negotiates OAuth automatically (the server
answers an unauthenticated request with 401 + WWW-Authenticate and publishes
/.well-known/oauth-protected-resource and /.well-known/oauth-authorization-server).

## Install (Claude Code)

    claude plugin marketplace add pitwch/pfx-mcp-server
    claude plugin install pfx-mcp-remote@pfx-mcp-server

## Local vs. remote

- Remote (this plugin): OAuth, nothing stored locally — use this for the Claude
  directory and for claude.ai.
- Local bridge (pfx-mcp-server): stdio bridge with userConfig — keep for Claude
  Desktop/Code users who prefer to configure the API key and Proffix credentials locally.
