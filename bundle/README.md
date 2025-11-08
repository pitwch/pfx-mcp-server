# MCPB Bundle Configuration

This directory contains the configuration for building the MCPB (MCP Bundle) file for one-click installation in Claude Desktop and other MCP-compatible applications.

## Files

- **manifest.json** - Bundle manifest with metadata and configuration
  - Defines server entry point, required environment variables, and capabilities
  - Based on the MCPB specification from Anthropic

## Building the Bundle

### Automated (GitHub Actions)
The bundle is automatically built and released when you create a new tag:

```bash
git tag v1.0.6
git push origin v1.0.6
```

This triggers the GitHub workflow that:
1. Updates version numbers in all files
2. Builds the `.mcpb` file
3. Creates a GitHub release with the bundle attached

### Manual Build
You can also build locally:

```bash
npm run build:mcpb
```

The output will be in `dist/pfx-mcp-server.mcpb`

## Testing the Bundle

1. Build the bundle (see above)
2. Double-click `dist/pfx-mcp-server.mcpb`
3. Claude Desktop should open with an installation dialog
4. Enter your Proffix credentials
5. Restart Claude Desktop

## Manifest Configuration

The `manifest.json` includes:
- **Server configuration**: Points to `mcp-http-bridge.js` with Node.js runtime
- **Environment variables**: All required Proffix credentials with descriptions
- **Capabilities**: Tools and prompts enabled
- **Metadata**: Name, description, version, tags, etc.

## Version Management

Version numbers should be kept in sync across:
- `bundle/manifest.json`
- `package.json`
- `server.json`

The GitHub workflow automatically updates all three when releasing.
