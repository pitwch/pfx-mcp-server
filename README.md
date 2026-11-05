# pfx MCP Server für Forterro Proffix Px5

**Deutsch** · [English](README.en.md)

Client-Bridge und Installationspakete für [pfx MCP](https://mcp.pfx.ch). Dieses Repo ist nicht der Server selbst. Die Bridge spricht stdio mit dem KI-Client und leitet JSON-RPC an den gehosteten Server weiter:

```text
KI-Client → mcp-http-bridge.js → https://mcp.pfx.ch/api/server → Ihre Proffix-REST-API
```

**API-Key ist Pflicht.** Zusätzlich braucht jeder Aufruf Ihre Proffix-REST-Zugangsdaten (URL, Port, Datenbank, Benutzer, Passwort). Beides wird nicht ins Git geschrieben.

Bridge-Version: **1.1.9** · Node.js **18+** · Lizenz: MIT

## Voraussetzungen

1. API-Key anfordern: [mcp.pfx.ch/request-api-key.html](https://mcp.pfx.ch/request-api-key.html) (nur der Key, ohne `Bearer`).
2. Proffix Px5 REST erreichbar (typisch Port `11011`).
3. Node.js 18 oder neuer, ausser Sie nutzen nur das fertige MCPB-Bundle in Claude Desktop.

## Installation

### Claude Desktop (MCPB)

1. [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb) laden.
2. Claude Desktop: Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren… → `.mcpb` wählen.
3. API-Key und Proffix-Felder ausfüllen.
4. Claude neu starten. Test: „Zeige Adressen aus Zürich.“

Das ist eine lokale Desktop-Erweiterung, kein Eintrag im öffentlichen Claude Directory.

### Claude Code (eigener Marktplatz)

```bash
claude plugin marketplace add pitwch/pfx-mcp-server
claude plugin install pfx-mcp-server@pfx-mcp-server
```

Claude Code fragt den API-Key (Pflicht, maskiert) und die Proffix-Felder ab. Die Bridge sendet `Authorization: Bearer <key>` an `https://mcp.pfx.ch/api/server`.

### Andere MCP-Clients (Cursor, Gemini CLI, …)

Bridge aus diesem Repo verwenden (oder [mcp-http-bridge.js](mcp-http-bridge.js) speichern):

```json
{
  "mcpServers": {
    "pfx-mcp": {
      "command": "node",
      "args": ["C:\\pfad\\zu\\mcp-http-bridge.js", "https://mcp.pfx.ch/api/server"],
      "env": {
        "HTTP_AUTHORIZATION": "Bearer IHR_API_KEY",
        "PROFFIX_USERNAME": "rest-user",
        "PROFFIX_PASSWORD": "rest-passwort",
        "PROFFIX_URL": "https://ihr-proffix.example",
        "PROFFIX_PORT": "11011",
        "PROFFIX_DATABASE": "IHRE_DB",
        "RESPONSE_FORMAT": "json"
      }
    }
  }
}
```

Unter macOS/Linux den Pfad in `args` anpassen. Client-Setup: [mcp.pfx.ch/ai-clients.html](https://mcp.pfx.ch/ai-clients.html).

Login-Token: `PROFFIX_USERNAME` weglassen und den Token als `PROFFIX_PASSWORD` setzen.

## Konfiguration

| Variable | Pflicht | Bedeutung |
| --- | --- | --- |
| `HTTP_AUTHORIZATION` | ja | `Bearer` plus API-Key |
| `PROFFIX_URL` | ja | Proffix-Host |
| `PROFFIX_PORT` | ja | REST-Port, meist `11011` |
| `PROFFIX_DATABASE` | ja | Mandanten-Datenbank |
| `PROFFIX_USERNAME` | ja* | REST-Benutzer |
| `PROFFIX_PASSWORD` | ja | Passwort oder Login-Token |
| `RESPONSE_FORMAT` | nein | `json` (Standard) oder `toon` |

\* Bei Login-Token leer lassen.

## Antwortformat

- `json`: Proffix-JSON, Standard.
- `toon`: kompaktere, für Modelle aufbereitete Darstellung.

Global über `RESPONSE_FORMAT`. Ein einzelner Tool-Call kann `format` setzen und die Env-Variable für diesen Call übersteuern.

## Was der Server kann

Der gehostete Endpoint spricht MCP über JSON-RPC (`initialize`, `tools/list`, `tools/call`). Kuratierte `px_*`-Tools decken typische Abläufe ab (Adressen, Artikel, Lager, Debitoren/Kreditoren, Aufträge, Listen). Darüber hinaus gibt es Legacy-Tools wie `proffix_search_endpoints` und `proffix_call_endpoint`, um weitere REST-Pfade zu finden und aufzurufen.

Beispiele:

- „Zeige offene Debitoren.“
- „Suche Artikel mit Laptop im Namen.“
- „Welche Adressen haben sich diese Woche geändert?“

Listennummern (`listeNr`) sind mandantenspezifisch. Die KI soll sie über die vorhandenen Such-Tools auflösen, nicht erfinden.

## Sicherheit

- API-Key und Proffix-Zugangsdaten gehen bei jedem Request als HTTPS-Header an `mcp.pfx.ch`. Der Server ruft damit Ihre Proffix-REST-API auf.
- Legen Sie Key und Passwort nicht in dieses Repo, nicht in Tickets und nicht in den Chat.
- Die Bridge schreibt ein Debug-Log nach `%TEMP%\pfx-mcp-bridge.log` (macOS/Linux: Temp-Verzeichnis, Datei `pfx-mcp-bridge.log`).
- Tool-Resultate sieht der KI-Anbieter des Clients. Das ist kein lokales Offline-Modell.
- Details zur Desktop-Installationswarnung: [SECURITY_INFO.md](SECURITY_INFO.md).

## Betrieb und Support

- Produktseite: [https://mcp.pfx.ch](https://mcp.pfx.ch)
- API-Key: [request-api-key.html](https://mcp.pfx.ch/request-api-key.html)
- Version/Status: [https://mcp.pfx.ch/api/version](https://mcp.pfx.ch/api/version)
- Debug-Beispiele: [https://mcp.pfx.ch/debug.html](https://mcp.pfx.ch/debug.html)
- MCP Registry: Paket `ch.pfx/mcp-server` auf [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- Support: [support@pfx.ch](mailto:support@pfx.ch) · [mcp.pfx.ch/support](https://mcp.pfx.ch/support)

MCPB lokal bauen: [README-BUILD.md](README-BUILD.md).

## Lizenz

MIT. Siehe [LICENSE](LICENSE).

Voraussetzung bleibt ein eigener Zugang zur Forterro Proffix Px5 REST-API.
