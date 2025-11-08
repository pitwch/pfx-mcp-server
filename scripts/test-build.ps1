# PowerShell script to test MCPB build locally
# Usage: .\scripts\test-build.ps1

Write-Host "🧪 Testing MCPB Build Process" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found. Please install Node.js 18 or higher." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green

# Check for zip or 7z
Write-Host "Checking for zip utilities..." -ForegroundColor Yellow
$hasZip = $false
try {
    zip --version 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Found zip command" -ForegroundColor Green
        $hasZip = $true
    }
} catch {}

if (-not $hasZip) {
    try {
        7z 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Found 7-Zip" -ForegroundColor Green
            $hasZip = $true
        }
    } catch {}
}

if (-not $hasZip) {
    Write-Host "❌ Neither zip nor 7-Zip found. Please install one of them." -ForegroundColor Red
    Write-Host "   Download 7-Zip: https://www.7-zip.org/" -ForegroundColor Yellow
    exit 1
}

# Run build
Write-Host ""
Write-Host "Building MCPB bundle..." -ForegroundColor Yellow
npm run build:mcpb

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Verify output
Write-Host ""
Write-Host "Verifying output..." -ForegroundColor Yellow
$mcpbFile = "dist\pfx-mcp-server.mcpb"

if (Test-Path $mcpbFile) {
    $size = (Get-Item $mcpbFile).Length
    $sizeKB = [math]::Round($size / 1KB, 2)
    Write-Host "✓ MCPB file created: $mcpbFile" -ForegroundColor Green
    Write-Host "✓ File size: $sizeKB KB" -ForegroundColor Green
    
    # Try to list contents
    Write-Host ""
    Write-Host "Bundle contents:" -ForegroundColor Yellow
    try {
        if (Get-Command unzip -ErrorAction SilentlyContinue) {
            unzip -l $mcpbFile
        } elseif (Get-Command 7z -ErrorAction SilentlyContinue) {
            7z l $mcpbFile
        } else {
            Write-Host "⚠ Cannot list contents (no unzip or 7z available)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠ Could not list bundle contents" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Double-click $mcpbFile to test installation in Claude Desktop" -ForegroundColor White
    Write-Host "2. Or create a release: git tag v1.0.x && git push origin v1.0.x" -ForegroundColor White
} else {
    Write-Host "❌ MCPB file not found at $mcpbFile" -ForegroundColor Red
    exit 1
}
