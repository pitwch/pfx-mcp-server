# Building MCPB for Local Development/Debugging

## Quick Start

```bash
npm run build:mcpb
```

Or on Windows:

```powershell
.\scripts\build-mcpb.ps1
```

This creates `dist/pfx-mcp-server.mcpb` for Claude Desktop testing.

Before committing bridge changes without a full build:

```bash
npm run sync:bridge
```

That copies the canonical root `mcp-http-bridge.js` into `plugins/pfx-mcp-server/`.

## What the Build Does

1. Syncs the bridge into the Claude Code plugin folder
2. Stages `bundle/` (manifest, icon, locales) plus root bridge and LICENSE
3. Zips to `dist/pfx-mcp-server.mcpb` (`zip`, `7z`, or PowerShell `Compress-Archive`)

## How the Bridge Works

`mcp-http-bridge.js` bridges:

- **stdio MCP clients** (Claude Desktop, Cursor, …) ↔ **HTTP MCP** at `mcp.pfx.ch`

### Key Features

- Protocol version shim for Claude Desktop (MCP versions are ISO dates; string compare is fine)
- Capability normalization (`true` → `{}` for tools/prompts)
- Logging to stderr; optional file log via `PFX_MCP_LOG_FILE`

## Debugging

Default logs go to the client stderr. For a file log:

```powershell
$env:PFX_MCP_LOG_FILE = "$env:TEMP\pfx-mcp-bridge.log"
# then start the bridge / MCP client
Get-Content $env:TEMP\pfx-mcp-bridge.log | Select-Object -Last 50
```

## Development Workflow

1. Edit `mcp-http-bridge.js` (root only)
2. `npm run build:mcpb` (or at least `npm run sync:bridge`)
3. Install/test the `.mcpb` or Claude Code plugin
4. Check stderr / optional log file

## Files Structure

```text
pfx-mcp-server/
├── bundle/
│   ├── manifest.json
│   ├── icon.png
│   └── locales/
├── plugins/pfx-mcp-server/   # Claude Code plugin (bridge synced from root)
├── scripts/
│   └── build-mcpb.js         # Single build entrypoint
├── mcp-http-bridge.js        # Canonical bridge
├── LICENSE
└── dist/
    └── pfx-mcp-server.mcpb
```

## Notes

- Default server URL: `https://mcp.pfx.ch/api/server`
- Env vars come from MCPB / plugin `user_config` (including `RESPONSE_FORMAT`)
- Keep `pfx-mcp-remote` version independent of the bridge package
