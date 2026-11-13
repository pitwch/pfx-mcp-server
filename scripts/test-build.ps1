# Test MCPB build locally
# Usage: .\scripts\test-build.ps1

Write-Host "Testing MCPB build" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Node.js not found. Install Node.js 18 or higher." -ForegroundColor Red
    exit 1
}
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green

Write-Host ""
Write-Host "Building MCPB bundle..." -ForegroundColor Yellow
npm run build:mcpb
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Verifying output..." -ForegroundColor Yellow
$mcpbFile = "dist\pfx-mcp-server.mcpb"

if (-not (Test-Path $mcpbFile)) {
    Write-Host "MCPB file not found at $mcpbFile" -ForegroundColor Red
    exit 1
}

$sizeKB = [math]::Round((Get-Item $mcpbFile).Length / 1KB, 2)
Write-Host "MCPB file created: $mcpbFile ($sizeKB KB)" -ForegroundColor Green

$pluginBridge = "plugins\pfx-mcp-server\mcp-http-bridge.js"
$rootBridge = "mcp-http-bridge.js"
$rootHash = (Get-FileHash $rootBridge -Algorithm SHA256).Hash
$pluginHash = (Get-FileHash $pluginBridge -Algorithm SHA256).Hash
if ($rootHash -ne $pluginHash) {
    Write-Host "Plugin bridge is out of sync with root bridge" -ForegroundColor Red
    exit 1
}
Write-Host "Plugin bridge matches root bridge" -ForegroundColor Green

Write-Host ""
Write-Host "Build successful" -ForegroundColor Green
Write-Host "Next: install $mcpbFile in Claude Desktop, or publish via release workflow"
