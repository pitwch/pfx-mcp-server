---
name: get-started
description: Ersteinrichtung Proffix Px5 (pfx-mcp) ueber den Remote-Connector / first-run setup over the hosted connector. Use when the user wants to connect Proffix, search addresses, or run an ERP query. Reply in the user's language.
---

# Proffix Px5 (pfx-mcp) — Remote

## Sprache

Antworte immer in der Sprache der letzten Nutzernachricht. Deutsch bleibt Deutsch,
Englisch bleibt Englisch, Franzoesisch bleibt Franzoesisch. Fachbegriffe (API-Key,
Proffix, Datenbank, Port) duerfen bleiben.

## Anmeldung (OAuth)

Dieser Connector laeuft remote auf https://mcp.pfx.ch. Die Anmeldung erfolgt ueber
OAuth auf der sicheren Connect-Seite von mcp.pfx.ch — nicht im Chat.

1. Wenn keine pfx-Tools verfuegbar sind oder ein Aufruf 401/403 liefert: den Nutzer die
   Verbindung ueber den OAuth-Dialog herstellen lassen. Dort gibt er ein:
   - pfx-MCP-API-Key von https://mcp.pfx.ch/request-api-key.html (nur der Key)
   - Proffix-Benutzer, Passwort, URL, Port (Standard 11011), Datenbank
2. API-Key und Passwort nie im Chat verlangen und nie wiederholen.
3. Key, Datenbank und listeNr nie erfinden.

## Smoke

Sobald der Nutzer bestaetigt, dass die Verbindung steht, einen Lese-Aufruf ausfuehren
(z. B. eine Adresssuche mit einem Namen, den er nennt). Reports
(px_generate_report) einzeln ausfuehren. Anlegen, Aendern und Loeschen erst nach
ausdruecklicher Bestaetigung.
