# Building MCPB for Local Development/Debugging

## Quick Start

To build and test your MCPB locally:

```powershell
.\scripts\build-mcpb.ps1
```

This creates `dist/pfx-mcp-server.mcpb` which you can drag and drop into Claude Desktop for testing.

## What the Build Script Does

1. **Copies all required files** from `bundle/` directory:
   - `manifest.json` - Package configuration
   - `icon.png` - Application icon
   - `locales/` - Localization files

2. **Copies server files** from root:
   - `mcp-http-bridge.js` - HTTP bridge server
   - `LICENSE` - License file

3. **Creates MCPB package** - Bundles everything into a `.mcpb` file (which is actually a ZIP archive)

## How the Bridge Works

The `mcp-http-bridge.js` bridges between:

- **Claude Desktop** (stdio transport) ↔ **Your HTTP MCP Server** (HTTP transport)

### Key Features

- **Protocol version upgrade** - Automatically upgrades older server versions (2024-11-05) to match Claude's expectations (2025-06-18)
- **Capability normalization** - Ensures capability structures are compatible
- **Error logging** - Logs errors to `%TEMP%\pfx-mcp-bridge.log` for debugging

## Debugging

If you encounter issues, check the log file:

```powershell
Get-Content $env:TEMP\pfx-mcp-bridge.log | Select-Object -Last 50
```

## Development Workflow

1. Make changes to your code
2. Run `.\scripts\build-mcpb.ps1`
3. Drag the new `.mcpb` into Claude Desktop
4. Test your changes
5. Check logs if needed

## Files Structure

```text
pfx-mcp-server/
├── bundle/
│   ├── manifest.json       # MCPB package configuration
│   ├── icon.png           # Application icon
│   └── locales/           # Localization files
├── scripts/
│   └── build-mcpb.ps1     # Build script
├── mcp-http-bridge.js     # HTTP bridge server
├── LICENSE                # MIT License
└── dist/
    └── pfx-mcp-server.mcpb  # Built package
```

## Notes

- The bridge connects to `https://mcp.pfx.ch/api/server` by default
- Environment variables are injected from the MCPB configuration
- The log file persists between runs for debugging purposes
