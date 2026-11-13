# Sicherheitsinformationen / Security Information

## Warnung bei Installation / Installation Warning

### 🇩🇪 Deutsch

**Warnung:** "Die Installation gewährt Zugriff auf alles auf deinem Computer."

#### Warum diese Warnung?

Diese Warnung erscheint, weil der MCP Server:
1. **Node.js ausführt** - Ein vollwertiges Programm mit Dateisystemzugriff
2. **Auf deine Proffix-Daten zugreift** - Über die REST API (via mcp.pfx.ch)
3. **Netzwerkverbindungen herstellt** - Zu mcp.pfx.ch (und von dort zu deinem Proffix)

#### Was macht der Server wirklich?

Der pfx MCP Server (lokale Bridge in diesem Repo):
- **Verbindet** sich nur mit `mcp.pfx.ch`
- **Leitet** API-Key und Proffix-Credentials als HTTP-Header an mcp.pfx.ch weiter
- **Speichert keine Geschäftsdaten** lokal
- **Liest keine lokalen Dateien** außer dem Script selbst
- **Schreibt** standardmässig nur nach stderr; optional in eine Log-Datei, wenn `PFX_MCP_LOG_FILE` gesetzt ist
- **Ändert nichts** an deinem System

#### Technische Details

```
Claude Desktop → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → Dein Proffix
```

**Berechtigungen:**
- **Netzwerk**: HTTPS zu mcp.pfx.ch
- **Umgebungsvariablen**: Lesen der Credentials aus der MCP-Konfiguration
- **Dateisystem**: Script laden; optionales Log nur bei `PFX_MCP_LOG_FILE`

#### Ist das sicher?

1. **Open Source**: Bridge und Packaging sind auf GitHub einsehbar
2. **Keine lokale Datenspeicherung** von Proffix-Inhalten
3. **Credentials gehen an mcp.pfx.ch**, das sie an dein Proffix weiterreicht (nicht „direkt nur an Proffix“ vom Client aus)
4. **Verschlüsselt**: HTTPS
5. **Minimaler Code**: kleine, prüfbare Bridge (wenige hundert Zeilen)

#### Code-Review

- **Bridge Script**: [mcp-http-bridge.js](https://github.com/pitwch/pfx-mcp-server/blob/main/mcp-http-bridge.js)
- **Manifest**: [bundle/manifest.json](https://github.com/pitwch/pfx-mcp-server/blob/main/bundle/manifest.json)

---

### 🇬🇧 English

**Warning:** "Installation grants access to everything on your computer."

#### Why this warning?

This warning appears because the MCP server:
1. **Runs Node.js** - A full program with filesystem access
2. **Accesses your Proffix data** - Via the REST API (through mcp.pfx.ch)
3. **Makes network connections** - To mcp.pfx.ch (and from there to your Proffix)

#### What does the server actually do?

The pfx MCP server (local bridge in this repo):
- **Connects** only to `mcp.pfx.ch`
- **Forwards** API key and Proffix credentials as HTTP headers to mcp.pfx.ch
- **Stores no business data** locally
- **Reads no local files** except the script itself
- **Writes** to stderr by default; optional file log only if `PFX_MCP_LOG_FILE` is set
- **Changes nothing** on your system

#### Technical Details

```
Claude Desktop → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → Your Proffix
```

**Required permissions:**
- **Network**: HTTPS to mcp.pfx.ch
- **Environment variables**: Read credentials from MCP configuration
- **Filesystem**: Load the script; optional log only with `PFX_MCP_LOG_FILE`

#### Is it safe?

1. **Open Source**: Bridge and packaging are on GitHub
2. **No local storage** of Proffix content
3. **Credentials go to mcp.pfx.ch**, which calls your Proffix (not a direct client-only link to Proffix)
4. **Encrypted**: HTTPS
5. **Minimal code**: small, reviewable bridge (a few hundred lines)

#### Code Review

- **Bridge Script**: [mcp-http-bridge.js](https://github.com/pitwch/pfx-mcp-server/blob/main/mcp-http-bridge.js)
- **Manifest**: [bundle/manifest.json](https://github.com/pitwch/pfx-mcp-server/blob/main/bundle/manifest.json)

---

## Datenschutz / Privacy

### Was wird übertragen? / What is transmitted?

**An mcp.pfx.ch:**
- API Key (Authentifizierung)
- Proffix Credentials (HTTP Headers)
- MCP-Anfragen (z.B. "Zeige Adressen")

**NICHT übertragen / NOT transmitted:**
- Keine lokalen Dateien / No local files
- Keine Browserdaten / No browser data
- Keine anderen Programme / No other programs

### Datenfluss / Data Flow

```
1. Claude fragt: "Zeige Adressen"
2. Bridge leitet weiter an mcp.pfx.ch
3. mcp.pfx.ch ruft dein Proffix ab
4. Antwort geht zurück zu Claude
5. KEINE Speicherung der Geschäftsdaten in der Bridge
```

---

## Häufige Fragen / FAQ

### 🇩🇪 Kann der Server meine Dateien lesen?

**Technisch ja** (Node.js), aber der Bridge-Code tut das nicht. Du kannst den Source Code selbst prüfen.

### 🇩🇪 Warum nicht lokal ohne Remote-Server?

Der Remote-Server bei mcp.pfx.ch:
- Verwaltet 120+ Proffix Endpoints
- Stellt Fuzzy-Search bereit
- Wird zentral aktualisiert
- Du musst nichts am Backend warten

### 🇩🇪 Kann ich den Server selbst hosten?

Dieses Repo enthält die **Client-Bridge** und Packaging. Das gehostete Backend unter mcp.pfx.ch ist separat. Für eine eigene URL kannst du die Bridge-URL im Manifest bzw. in der Client-Config anpassen, sofern du ein kompatibles Backend betreibst.

### 🇬🇧 Can the server read my files?

**Technically yes** (Node.js), but the bridge code does not. You can review the source yourself.

### 🇬🇧 Why not local without remote server?

The remote server at mcp.pfx.ch:
- Manages 120+ Proffix endpoints
- Provides fuzzy search
- Is centrally updated
- You don't need to maintain the backend

### 🇬🇧 Can I self-host the server?

This repo ships the **client bridge** and packaging. The hosted backend at mcp.pfx.ch is separate. You can point the bridge URL in the manifest/client config at your own compatible backend.

---

## Kontakt / Contact

Bei Sicherheitsbedenken / For security concerns:
- **Email**: security@pfx.ch
- **GitHub Issues**: https://github.com/pitwch/pfx-mcp-server/issues
- **Website**: https://mcp.pfx.ch/#kontakt
