# DNS Authentication Setup for ch.pfx/* namespace

## Step 1: Generate Ed25519 Keypair

Run these commands locally (PowerShell or Git Bash):

```bash
# Generate private key
openssl genpkey -algorithm Ed25519 -out key.pem

# Extract public key for DNS record
openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64
```

Save the output - this is your **PUBLIC KEY** for the DNS TXT record.

## Step 2: Get Private Key for GitHub Secrets

```bash
# Extract private key seed (hex format)
openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n'
```

Save this output - this is your **PRIVATE KEY** for GitHub Actions secret.

## Step 3: Add TXT Record to Cloudflare

1. Go to Cloudflare Dashboard → DNS → Records
2. Add a new TXT record:
   - **Name**: `_mcp.pfx.ch` (or just `_mcp` if the zone is `pfx.ch`)
   - **Content**: `v=MCPv1; k=ed25519; p=YOUR_PUBLIC_KEY_FROM_STEP_1`
   - **TTL**: Auto

Example:
```
_mcp.pfx.ch. IN TXT "v=MCPv1; k=ed25519; p=abcdef1234567890..."
```

## Step 4: Add GitHub Secret

1. Go to GitHub repository: https://github.com/pitwch/pfx-mcp-server
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
   - **Name**: `MCP_PRIVATE_KEY`
   - **Value**: Paste the private key from Step 2

## Step 5: Test Authentication Locally (Optional)

```bash
# Test login with DNS auth
mcp-publisher login dns --domain pfx.ch --private-key YOUR_PRIVATE_KEY_FROM_STEP_2

# Test publish
mcp-publisher publish
```

## Step 6: Verify DNS Record

Wait a few minutes for DNS propagation, then verify:

```bash
nslookup -type=TXT _mcp.pfx.ch
```

You should see your TXT record with the public key.
