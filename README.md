# pfx MCP Server für Forterro Proffix Px5

**Deutsch** · [English](README.en.md)

Verbinden Sie Claude, Cursor und andere KI-Assistenten mit Ihrem Proffix Px5.

```text
KI-Assistent → pfx MCP → Ihr Proffix
```

Dafür brauchen Sie einen [API-Key](https://mcp.pfx.ch/request-api-key.html) und die REST-Zugangsdaten Ihres Proffix (Adresse, Port, Datenbank, Benutzer, Passwort).

Version **1.1.13** · Node.js **18+** · [MIT](LICENSE)

## Installation

### Claude Desktop

1. [pfx-mcp-server.mcpb](https://github.com/pitwch/pfx-mcp-server/releases/latest/download/pfx-mcp-server.mcpb) herunterladen.
2. In Claude: Einstellungen → Erweiterungen → Erweiterte Einstellungen → Erweiterung installieren… → Datei wählen.
3. API-Key und Proffix-Zugangsdaten eintragen.
4. Claude neu starten. Zum Beispiel: „Zeige Adressen aus Zürich.“

### Claude Code

```bash
claude plugin marketplace add pitwch/pfx-mcp-server
claude plugin install pfx-mcp-server@pfx-mcp-server
```

Claude fragt nach dem API-Key und den Proffix-Zugangsdaten.

### Cursor, Gemini CLI und andere Clients

[mcp-http-bridge.js](mcp-http-bridge.js) aus diesem Repo verwenden. Weitere Clients: [mcp.pfx.ch/ai-clients.html](https://mcp.pfx.ch/ai-clients.html).

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

Unter macOS und Linux den Pfad in `args` anpassen. Wer einen Login-Token nutzt, lässt `PROFFIX_USERNAME` leer und setzt den Token als `PROFFIX_PASSWORD`.

### ChatGPT

Plugin-Paket: [pfx-proffix-chatgpt.zip](https://github.com/pitwch/pfx-mcp-server/raw/main/downloads/pfx-proffix-chatgpt.zip)

## Zugangsdaten

| Angabe | Bedeutung |
| --- | --- |
| API-Key | Key von [mcp.pfx.ch](https://mcp.pfx.ch/request-api-key.html), im Feld mit `Bearer ` davor |
| `PROFFIX_URL` | Adresse Ihres Proffix |
| `PROFFIX_PORT` | REST-Port, meist `11011` |
| `PROFFIX_DATABASE` | Datenbank / Mandant |
| `PROFFIX_USERNAME` | Benutzer |
| `PROFFIX_PASSWORD` | Passwort oder Login-Token |
| `RESPONSE_FORMAT` | `json` oder `toon` (optional, Standard ist `json`) |

`toon` ist eine kürzere Darstellung derselben Daten. Pro Abfrage kann `format` das Format einzeln setzen.

## Beispiele

- „Zeige offene Debitoren.“
- „Suche Artikel mit Laptop im Namen.“
- „Welche Adressen haben sich diese Woche geändert?“

Abgedeckt sind unter anderem Adressen, Artikel, Lager, Debitoren, Kreditoren, Aufträge und Listen.

## Hilfe

- [mcp.pfx.ch](https://mcp.pfx.ch)
- [API-Key anfordern](https://mcp.pfx.ch/request-api-key.html)
- [Verbindung testen](https://mcp.pfx.ch/debug.html)
- [Server-Version](https://mcp.pfx.ch/api/version)
- [support@pfx.ch](mailto:support@pfx.ch)

Bei der Installation in Claude Desktop kann eine Warnung erscheinen. Was sie bedeutet, steht in [SECURITY_INFO.md](SECURITY_INFO.md). Logs gehen standardmässig nach stderr; optional Datei-Log über `PFX_MCP_LOG_FILE`.

MCPB selbst bauen: [README-BUILD.md](README-BUILD.md).
