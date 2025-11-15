# pfx MCP Server für Forterro Proffix Px5

**🇩🇪 Deutsch | [🇬🇧 English](README.en.md)**

**Model Context Protocol Server für Forterro Proffix Px5 ERP**

Die universelle Schnittstelle für AI/KI-Integration mit deinem Proffix Px5 ERP

Verbinde AI-Assistenten (Claude, ChatGPT, Gemini) mit deinem Proffix Px5 über standardisiertes MCP-Protokoll.

**JSON-RPC 2.0 Transport • Parameterbasierte Auth • Aufbereitete Proffix Endpoints**

## 🌟 Was ist das Model Context Protocol (MCP)?

Model Context Protocol (MCP) ist ein offener Standard von Anthropic für sichere AI-Integration. KI-Assistenten greifen direkt auf deine Systeme zu - ohne manuelle Datenkopien oder Screenshots.

**Ohne MCP:** "Zeig mir alle offenen Rechnungen" → Du musst Proffix öffnen, Daten exportieren, in die KI kopieren

**Mit MCP:** "Zeig mir alle offenen Rechnungen" → Die KI greift direkt auf Proffix zu und liefert die Antwort

- **Echtzeit-Zugriff:** KI arbeitet mit aktuellen Daten aus deinen Systemen
- **Sicherheit:** Keine Daten werden in der KI gespeichert - nur temporärer Zugriff
- **Automatisierung:** KI kann komplexe Aufgaben über mehrere Systeme hinweg ausführen
- **Natürliche Sprache:** Keine SQL oder API-Kenntnisse erforderlich
- **Standardisiert:** Funktioniert mit allen MCP-kompatiblen KI-Assistenten

## 📋 Was ist pfx MCP?

pfx MCP ist der erste MCP Server für Forterro Proffix Px5. Verbinde AI-Assistenten wie Claude, ChatGPT und Gemini mit deinem ERP. Greife auf Daten zu, erstelle Berichte und automatisiere Workflows - direkt über natürliche Sprache.

- **Proffix Funktionen** direkt via MCP Tools
- **JSON-RPC 2.0 Transport** für alle MCP-Clients
- **Kostenloser API Key** (Beta)
- **Claude, ChatGPT, Gemini Ready**

**Offiziell gelistet im MCP Registry:**
- 📦 Package: `ch.pfx/mcp-server`
- 🔗 Registry: [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- 💻 GitHub: [github.com/pitwch/pfx-mcp-server](https://github.com/pitwch/pfx-mcp-server)
- ✅ Status: Active • Version 1.0.0 • Published 2025-11-08

## 💡 Praktische Anwendungsfälle

### 📊 Intelligente Datenabfragen
**Beispiel:** "Zeige mir alle offenen Rechnungen"

Die KI greift direkt auf deine Proffix-Daten zu und liefert strukturierte Ergebnisse - ohne SQL oder API-Kenntnisse.

### 🔍 Komplexe Suchen
**Beispiel:** "Suche Artikel mit 'Laptop' im Namen und Preis unter 1000 CHF"

Natürliche Sprachabfragen werden automatisch in präzise API-Calls umgewandelt.

### 📈 Automatische Berichte
**Beispiel:** "Erstelle einen Bericht über die Top 10 Kunden nach Umsatz"

Die KI aggregiert Daten, erstellt Analysen und formatiert Ergebnisse professionell.

### 🔔 Änderungsverfolgung
**Beispiel:** "Welche Adressen haben sich diese Woche geändert?"

Zeitbasierte Abfragen und Änderungsanalysen in Echtzeit.

### 💼 Weitere Anwendungsfälle
- **Lagerverwaltung:** "Zeige mir alle Artikel mit Lagerbestand unter 10"
- **Kundenanalysen:** "Analysiere die Umsatzentwicklung von Kunde 1001"
- **Workflow-Automatisierung:** "Erstelle eine neue Adresse für Firma XY"
- **Endpoint-Discovery:** "Welche API-Endpoints gibt es für Aufträge?"
- **Multi-System-Abfragen:** "Vergleiche Proffix-Daten mit unserem CRM"

## 🚀 Quick Start

### Option 1: One-Click Installation (Empfohlen) 🎯

**Für Claude Desktop Benutzer - Einfachste Installation!**

Die schnellste Methode - keine manuelle Konfiguration nötig!

1. **API Key holen**  
   Besuche [request-api-key.html](https://mcp.pfx.ch/request-api-key.html) und fordere deinen kostenlosen Key an (per E-Mail)

2. **MCPB Bundle laden**  
   [pfx-mcp-server.mcpb herunterladen](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb)

3. **Installieren**  
   In Claude Desktop: Einstellungen → Erweiterungen → Erweiterte Einstellungen (Bereich Extension Developer) → Erweiterung installieren… → die `.mcpb` Datei auswählen und den Anweisungen folgen

4. **Zugangsdaten eingeben**  
   API Key + deine Proffix Px5 Credentials (Username, Passwort, URL, Port, Datenbank)

5. **Fertig!**  
   Claude neu starten und testen: *"Zeige mir alle Adressen aus Zürich aus Proffix Px5"*

---

### Option 2: Manuelle Installation (Fortgeschritten) ⚙️

**Für andere MCP-Clients oder erweiterte Konfiguration**

Für andere MCP-Clients (Cursor, Windsurf, Gemini CLI, etc.) oder wenn du die Konfiguration selbst verwalten möchtest:

1. **API Key anfordern**  
   [request-api-key.html](https://mcp.pfx.ch/request-api-key.html)

2. **Bridge-Script laden**  
   [mcp-http-bridge.txt](https://mcp.pfx.ch/bridge/mcp-http-bridge.txt) herunterladen und zu `mcp-http-bridge.js` umbenennen

3. **Config-Datei öffnen**  
   Je nach Client:
   - Claude: `%APPDATA%\Claude\claude_desktop_config.json` (Windows) oder `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
   - Cursor/Windsurf: Siehe [AI Client Setup](https://mcp.pfx.ch/ai-clients.html)

4. **Server hinzufügen**  
   Siehe Beispiel-Config unten:

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
        "PROFFIX_DATABASE": "deine-db",
        "RESPONSE_FORMAT": "json"
      }
    }
  }
}
```

5. **Client neu starten und testen**  
   Frage deinen AI-Assistenten: *"Zeige mir alle Adressen aus Proffix"*

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

### Authentifizierung
- **API Key** für Zugriffskontrolle (kostenlos während Beta)
- **Proffix Credentials** als HTTP Headers (verschlüsselt übertragen)
- **Keine Datenspeicherung** auf MCP Server
- **Parameterbasierte Auth** ohne Sessions
- Zugangsdaten werden bei jeder Anfrage übertragen und nicht gespeichert

### Best Practices
- Verwende immer HTTPS für die Kommunikation
- Speichere Zugangsdaten niemals im Client-Code
- Implementiere Rate-Limiting auf Client-Seite
- Überwache API-Zugriffe regelmäßig
- Verwende starke Passwörter für Proffix API Benutzer

### Server-Sicherheit
- Umfassende .htaccess Sicherheitsregeln
- Schutz sensibler Dateien und Konfigurationen
- HTTPS-Verschlüsselung wird empfohlen

## 🌐 Remote Server

Der pfx MCP Server läuft als **hosted service** unter:
```
https://mcp.pfx.ch/api/server
```

**Transport:** JSON-RPC 2.0 via HTTP  
**Status:** [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)

## 🔌 Model Context Protocol API

Der pfx MCP Server implementiert das standardisierte Model Context Protocol über JSON-RPC 2.0:

### MCP Methoden
- **initialize** - Handshake zwischen Client und Server. Tauscht Capabilities und Protokollversion aus.
- **tools/list** - Listet alle verfügbaren Proffix-Operationen auf. Erfordert Authentifizierung.
- **tools/call** - Führt eine Proffix-Operation aus. Parameter werden in `arguments` übergeben.

### Verfügbare Proffix Tools
- `proffix_search_endpoints` - Fuzzy-Search über 120+ Endpoints
- `proffix_call_endpoint` - Direkter Endpoint-Aufruf
- `proffix_describe_endpoint` - Endpoint-Dokumentation
- Alle spezifischen Proffix API Endpoints (Adressen, Artikel, Aufträge, etc.)

### Response Formate

Der Server unterstützt zwei Antwortformate:

- **JSON** (Standard) - Strukturierte JSON-Antworten direkt von der Proffix API
- **TOON** (AI-optimiert) - Angereicherte Antworten mit natürlichsprachigen Beschreibungen, optimiert für AI-Verarbeitung

**Format-Aktivierung:**

1. **Global** (empfohlen) - Gilt für alle Aufrufe:
```json
{
  "name": "proffix_call_endpoint",
  "arguments": {
    "endpointId": 9,
    "format": "toon",
    "params": {
      "limit": 10
    }
  }
}
```

2. **Per-Call** - Überschreibt globale Einstellung:
```json
{
  "name": "proffix_call_endpoint",
  "arguments": {
    "endpointId": 9,
    "params": {
      "limit": 10,
      "format": "toon"
    }
  }
}
```

**Priorität:** `params.format` > `arguments.format` > `"json"` (Standard)

**Server URL:** `https://mcp.pfx.ch/api/server`

[🔧 Test-Beispiele & Debugging](https://mcp.pfx.ch/debug.html)

## 💡 Beispiel-Abfragen

### Allgemeine Abfragen
```
"Zeige mir alle offenen Rechnungen"
"Suche Artikel mit 'Laptop' im Namen"
"Welche Adressen haben sich diese Woche geändert?"
"Erstelle einen Bericht über Umsätze nach Kunde"
```

### Abteilungsspezifische Beispiele
- **Rechnungswesen:** "Zeige alle unbezahlten Rechnungen älter als 30 Tage"
- **Vertrieb:** "Liste alle Angebote aus Q4 2024 mit Status 'Offen'"
- **Einkauf:** "Welche Bestellungen sind überfällig?"
- **Controlling:** "Erstelle eine Umsatzübersicht nach Produktgruppen"
- **Support:** "Finde alle Servicefälle von Kunde XY"
- **Entwicklung:** "Dokumentiere alle verfügbaren Proffix-Endpoints"

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
