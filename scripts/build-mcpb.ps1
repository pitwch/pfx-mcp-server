# Thin wrapper around the Node build entrypoint.
# Usage: .\scripts\build-mcpb.ps1

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent (Split-Path -Parent $PSCommandPath))
npm run build:mcpb
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
