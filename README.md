# pfx MCP Server

**🇩🇪 Deutsch | [🇬🇧 English](README.en.md)**

**Model Context Protocol Server für Forterro Proffix Px5 ERP**

Verbinde AI-Assistenten (Claude, ChatGPT, Gemini) mit deinem Proffix Px5 über standardisiertes MCP-Protokoll.

## 🌟 Features

- **Proffix Funktionen** direkt via MCP Tools
- **JSON-RPC 2.0 Transport** für alle MCP-Clients
- **Sichere Authentifizierung** (API Key + Proffix Credentials)
- **Zero Installation** - Remote Server, keine lokale Installation nötig

## 🚀 Quick Start

### Option 1: One-Click Installation (Empfohlen) 🎯

**Für Claude Desktop Benutzer - Einfachste Installation!**

1. **API Key anfordern**  
   Kostenlosen API Key anfordern: [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **MCPB Bundle herunterladen**  
   Download: [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb)

3. **Installieren**  
   - Doppelklick auf die `.mcpb` Datei
   - Claude Desktop öffnet automatisch den Installations-Dialog
   - Proffix Credentials eingeben (API Key, Username, Password, URL, Port, Database)
   - Fertig! ✅

4. **Claude Desktop neu starten**  
   Frage Claude: *"Zeige mir alle Adressen aus Proffix"*

---

### Option 2: Manuelle Installation (Fortgeschritten) ⚙️

**Für andere MCP-Clients oder erweiterte Konfiguration**

1. **API Key anfordern**  
   Kostenlosen API Key anfordern: [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **MCP Bridge Script herunterladen**  
   Download: [mcp-http-bridge.js](https://mcp.pfx.ch/bridge/mcp-http-bridge.txt) (umbenennen zu `.js`)

3. **Claude Desktop konfigurieren**  
   `%APPDATA%\Claude\claude_desktop_config.json` (Windows) oder  
   `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "pfx-mcp": {
      "command": "node",
      "args": ["C:\\mcp\\mcp-http-bridge.js", "https://mcp.pfx.ch/api/server"],
      "env": {
        "HTTP_AUTHORIZATION": "Bearer DEIN_API_KEY",
        "PROFFIX_USERNAME": "dein-username",
        "PROFFIX_PASSWORD": "dein-passwort",
        "PROFFIX_URL": "https://dein-proffix.com",
        "PROFFIX_PORT": "11011",
        "PROFFIX_DATABASE": "deine-db"
      }
    }
  }
}
```

4. **Claude Desktop neu starten**  
   Frage Claude: *"Zeige mir alle Adressen aus Proffix"*

## 📚 Dokumentation

Vollständige Setup-Anleitungen für alle AI-Clients:
- **[Hauptdokumentation](https://mcp.pfx.ch)**
- **[AI Client Setup](https://mcp.pfx.ch/ai-clients.html)** (Claude, ChatGPT, Gemini, Cursor, Windsurf, Continue.dev)
- **[Testing & Debug](https://mcp.pfx.ch/debug.html)**

## 🔧 Unterstützte MCP-Clients

- ✅ Claude Desktop
- ✅ Cursor IDE
- ✅ Windsurf IDE
- ✅ Continue.dev (VS Code/JetBrains)
- ✅ Gemini CLI
- ⚡ ChatGPT (experimentell)
- ✅ Custom Clients (via MCP SDK)

## 🔒 Sicherheit

- API Key für Zugriffskontrolle (kostenlos während Beta)
- Proffix Credentials als HTTP Headers (verschlüsselt übertragen)
- Keine Datenspeicherung auf MCP Server
- Parameterbasierte Auth ohne Sessions

## 🌐 Remote Server

Der pfx MCP Server läuft als **hosted service** unter:
```
https://mcp.pfx.ch/api/server
```

**Transport:** JSON-RPC 2.0 via HTTP  
**Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 📋 Verfügbare Tools

- `proffix_search_endpoints` - Fuzzy-Search über 120+ Endpoints
- `proffix_call_endpoint` - Direkter Endpoint-Aufruf
- `proffix_describe_endpoint` - Endpoint-Dokumentation
- Alle spezifischen Proffix API Endpoints (Adressen, Artikel, Aufträge, etc.)

## 💡 Beispiel-Abfragen

```
"Zeige mir alle offenen Rechnungen"
"Suche Artikel mit 'Laptop' im Namen"
"Welche Adressen haben sich diese Woche geändert?"
"Erstelle einen Bericht über Umsätze nach Kunde"
```

## 🔗 Links

- **Website:** [https://mcp.pfx.ch](https://mcp.pfx.ch)
- **API Key:** [https://mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html)
- **Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

Bei Fragen: [https://mcp.pfx.ch/#kontakt](https://mcp.pfx.ch/#kontakt)

---

**Hinweis:** Erfordert Zugang zur Forterro Proffix Px5 REST API.
