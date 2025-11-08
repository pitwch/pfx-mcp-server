# PowerShell script to build MCPB bundle on Windows

Write-Host "Building MCPB bundle..." -ForegroundColor Cyan

$ROOT_DIR = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$BUNDLE_DIR = Join-Path $ROOT_DIR "bundle"
$DIST_DIR = Join-Path $ROOT_DIR "dist"
$OUTPUT_FILE = Join-Path $DIST_DIR "pfx-mcp-server.mcpb"
$BUILD_DIR = Join-Path $ROOT_DIR ".mcpb-build"

# Files and directories to bundle
$FILES_TO_BUNDLE = @("mcp-http-bridge.js", "LICENSE")
$DIRS_TO_BUNDLE = @() # Will copy from bundle/ directory later

# Create dist directory
if (-not (Test-Path $DIST_DIR)) {
    New-Item -ItemType Directory -Path $DIST_DIR | Out-Null
    Write-Host "Created dist directory" -ForegroundColor Green
}

# Create temporary build directory
if (Test-Path $BUILD_DIR) {
    Remove-Item -Recurse -Force $BUILD_DIR
}
New-Item -ItemType Directory -Path $BUILD_DIR | Out-Null
Write-Host "Created temporary build directory" -ForegroundColor Green

try {
    # Copy manifest.json
    $manifestSrc = Join-Path $BUNDLE_DIR "manifest.json"
    $manifestDest = Join-Path $BUILD_DIR "manifest.json"
    Copy-Item $manifestSrc $manifestDest
    Write-Host "Copied manifest.json" -ForegroundColor Green

    # Copy icon.png from bundle directory
    $iconSrc = Join-Path $BUNDLE_DIR "icon.png"
    $iconDest = Join-Path $BUILD_DIR "icon.png"
    if (Test-Path $iconSrc) {
        Copy-Item $iconSrc $iconDest
        Write-Host "Copied icon.png" -ForegroundColor Green
    } else {
        Write-Host "Warning: icon.png not found" -ForegroundColor Yellow
    }
    
    # Copy locales directory from bundle directory
    $localesSrc = Join-Path $BUNDLE_DIR "locales"
    $localesDest = Join-Path $BUILD_DIR "locales"
    if (Test-Path $localesSrc) {
        Copy-Item $localesSrc $localesDest -Recurse
        Write-Host "Copied locales directory" -ForegroundColor Green
    } else {
        Write-Host "Warning: locales directory not found" -ForegroundColor Yellow
    }
    
    # Copy other files
    foreach ($file in $FILES_TO_BUNDLE) {
        $src = Join-Path $ROOT_DIR $file
        $dest = Join-Path $BUILD_DIR $file
        
        if (Test-Path $src) {
            Copy-Item $src $dest
            Write-Host "Copied $file" -ForegroundColor Green
        } else {
            Write-Host "Warning: $file not found, skipping" -ForegroundColor Yellow
        }
    }

    # Create ZIP archive
    Write-Host "Creating MCPB archive..." -ForegroundColor Yellow
    
    # Remove existing MCPB file
    if (Test-Path $OUTPUT_FILE) {
        Remove-Item $OUTPUT_FILE
    }

    # Use PowerShell's built-in Compress-Archive with .zip extension, then rename to .mcpb
    $tempZipFile = $OUTPUT_FILE -replace '\.mcpb$', '.zip'
    Compress-Archive -Path "$BUILD_DIR\*" -DestinationPath $tempZipFile -Force
    Rename-Item $tempZipFile $OUTPUT_FILE
    
    Write-Host "Created MCPB archive" -ForegroundColor Green

    # Get file size
    $fileSize = (Get-Item $OUTPUT_FILE).Length
    $fileSizeKB = [math]::Round($fileSize / 1KB, 2)
    
    Write-Host ""
    Write-Host "Build complete!" -ForegroundColor Green
    Write-Host "Output: $OUTPUT_FILE" -ForegroundColor Cyan
    Write-Host "Size: $fileSizeKB KB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To test: Drag and drop the .mcpb file into Claude Desktop" -ForegroundColor White

} catch {
    Write-Host "Build failed: $_" -ForegroundColor Red
    exit 1
} finally {
    # Clean up temporary build directory
    if (Test-Path $BUILD_DIR) {
        Remove-Item -Recurse -Force $BUILD_DIR
        Write-Host "Cleaned up temporary files" -ForegroundColor Green
    }
}
