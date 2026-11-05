---
name: get-started
description: First-run check for Proffix Px5 (pfx-mcp). Use when the user wants to connect Proffix, search addresses, or run an ERP query. A pfx MCP API key is mandatory.
---

# Get started with Proffix Px5 (pfx-mcp)

## Required before any tool call

The pfx MCP API key is mandatory. There is no anonymous or keyless mode.

1. If tools fail with 401/403, stop and ask the user to set the plugin config:
   - API key from https://mcp.pfx.ch/request-api-key.html (key only, no `Bearer` prefix — the bridge adds it)
   - Proffix username, password, URL, port (default 11011), database
2. Never ask the user to paste the API key or password into the chat, and never echo them.
3. Never invent a key, database, or `listeNr`.

## Smoke

After the user confirms the key and Proffix credentials are saved in the plugin config, run one read (for example an address search for a name they give). Reports (`px_generate_report`) run alone. Confirm create/update/delete with the user before calling write tools.
