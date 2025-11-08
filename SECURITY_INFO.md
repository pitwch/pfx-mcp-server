# Sicherheitsinformationen / Security Information

## Warnung bei Installation / Installation Warning

### 🇩🇪 Deutsch

**Warnung:** "Die Installation gewährt Zugriff auf alles auf deinem Computer."

#### Warum diese Warnung?

Diese Warnung erscheint, weil der MCP Server:
1. **Node.js ausführt** - Ein vollwertiges Programm mit Dateisystemzugriff
2. **Auf deine Proffix-Daten zugreift** - Über die REST API
3. **Netzwerkverbindungen herstellt** - Zu deinem Proffix-Server und mcp.pfx.ch

#### Was macht der Server wirklich?

Der pfx MCP Server:
- ✅ **Verbindet** sich nur mit `mcp.pfx.ch` (unser Remote-Server)
- ✅ **Leitet** deine Proffix-Credentials sicher als HTTP-Header weiter
- ✅ **Speichert KEINE Daten** lokal auf deinem Computer
- ✅ **Liest KEINE anderen Dateien** außer seiner eigenen Konfiguration
- ✅ **Ändert NICHTS** an deinem System

#### Technische Details

**Was der Server tut:**
```
Claude Desktop → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → Dein Proffix
```

**Berechtigungen die benötigt werden:**
- **Netzwerk**: Verbindung zu mcp.pfx.ch und deinem Proffix-Server
- **Umgebungsvariablen**: Lesen der Proffix-Credentials aus der Konfiguration
- **Keine Dateisystem-Operationen** außer dem Laden des Scripts selbst

#### Ist das sicher?

✅ **JA**, weil:
1. **Open Source**: Der gesamte Code ist auf GitHub einsehbar
2. **Keine Datenspeicherung**: Weder lokal noch auf unserem Server
3. **Direkte Verbindung**: Deine Credentials gehen direkt an deinen Proffix-Server
4. **Verschlüsselt**: Alle Verbindungen über HTTPS
5. **Minimaler Code**: Nur ~200 Zeilen JavaScript, leicht überprüfbar

#### Code-Review

Du kannst den kompletten Source Code hier prüfen:
- **Bridge Script**: [mcp-http-bridge.js](https://github.com/pitwch/pfx-mcp-server/blob/main/mcp-http-bridge.js)
- **Manifest**: [bundle/manifest.json](https://github.com/pitwch/pfx-mcp-server/blob/main/bundle/manifest.json)

---

### 🇬🇧 English

**Warning:** "Installation grants access to everything on your computer."

#### Why this warning?

This warning appears because the MCP server:
1. **Runs Node.js** - A full program with filesystem access
2. **Accesses your Proffix data** - Via the REST API
3. **Makes network connections** - To your Proffix server and mcp.pfx.ch

#### What does the server actually do?

The pfx MCP Server:
- ✅ **Connects** only to `mcp.pfx.ch` (our remote server)
- ✅ **Forwards** your Proffix credentials securely as HTTP headers
- ✅ **Stores NO data** locally on your computer
- ✅ **Reads NO other files** except its own configuration
- ✅ **Changes NOTHING** on your system

#### Technical Details

**What the server does:**
```
Claude Desktop → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → Your Proffix
```

**Required permissions:**
- **Network**: Connection to mcp.pfx.ch and your Proffix server
- **Environment variables**: Read Proffix credentials from configuration
- **No filesystem operations** except loading the script itself

#### Is it safe?

✅ **YES**, because:
1. **Open Source**: All code is visible on GitHub
2. **No data storage**: Neither locally nor on our server
3. **Direct connection**: Your credentials go directly to your Proffix server
4. **Encrypted**: All connections via HTTPS
5. **Minimal code**: Only ~200 lines of JavaScript, easy to verify

#### Code Review

You can review the complete source code here:
- **Bridge Script**: [mcp-http-bridge.js](https://github.com/pitwch/pfx-mcp-server/blob/main/mcp-http-bridge.js)
- **Manifest**: [bundle/manifest.json](https://github.com/pitwch/pfx-mcp-server/blob/main/bundle/manifest.json)

---

## Datenschutz / Privacy

### Was wird übertragen? / What is transmitted?

**An mcp.pfx.ch:**
- ✅ API Key (zur Authentifizierung)
- ✅ Proffix Credentials (als HTTP Headers)
- ✅ MCP Anfragen (z.B. "Zeige Adressen")

**NICHT übertragen / NOT transmitted:**
- ❌ Keine lokalen Dateien / No local files
- ❌ Keine Browserdaten / No browser data
- ❌ Keine anderen Programme / No other programs

### Datenfluss / Data Flow

```
1. Claude fragt: "Zeige Adressen"
2. Bridge leitet weiter an mcp.pfx.ch
3. mcp.pfx.ch ruft dein Proffix ab
4. Antwort geht zurück zu Claude
5. KEINE Speicherung irgendwo
```

---

## Häufige Fragen / FAQ

### 🇩🇪 Kann der Server meine Dateien lesen?

**Technisch ja**, aber der Code tut das nicht. Du kannst den Source Code selbst überprüfen - es sind nur ~200 Zeilen.

### 🇩🇪 Warum nicht lokal ohne Remote-Server?

Der Remote-Server bei mcp.pfx.ch:
- Verwaltet 120+ Proffix Endpoints
- Stellt Fuzzy-Search bereit
- Wird zentral aktualisiert
- Du musst nichts installieren oder warten

### 🇩🇪 Kann ich den Server selbst hosten?

Ja! Der Server-Code ist Open Source. Du kannst ihn auf deinem eigenen Server deployen und die URL im Manifest ändern.

### 🇬🇧 Can the server read my files?

**Technically yes**, but the code doesn't do that. You can review the source code yourself - it's only ~200 lines.

### 🇬🇧 Why not local without remote server?

The remote server at mcp.pfx.ch:
- Manages 120+ Proffix endpoints
- Provides fuzzy search
- Is centrally updated
- You don't need to install or maintain anything

### 🇬🇧 Can I self-host the server?

Yes! The server code is open source. You can deploy it on your own server and change the URL in the manifest.

---

## Kontakt / Contact

Bei Sicherheitsbedenken / For security concerns:
- **Email**: security@pfx.ch
- **GitHub Issues**: https://github.com/pitwch/pfx-mcp-server/issues
- **Website**: https://mcp.pfx.ch/#kontakt
