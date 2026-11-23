---
name: get-started
description: Ersteinrichtung Proffix Px5 (pfx-mcp) über den Remote-Connector / first-run setup over the hosted connector. Use when the user wants to connect Proffix, search addresses, or run an ERP query. Reply in the user's language.
---

# Proffix Px5 (pfx-mcp) — Remote

## Sprache

Antworte immer in der Sprache der letzten Nutzernachricht. Deutsch bleibt Deutsch,
Englisch bleibt Englisch, Französisch bleibt Französisch. Fachbegriffe (API-Key,
Proffix, Datenbank, Port) dürfen bleiben.

## Anmeldung (OAuth)

Dieser Connector läuft remote auf https://mcp.pfx.ch. Die Anmeldung erfolgt über
OAuth auf der sicheren Connect-Seite von mcp.pfx.ch — nicht im Chat.

1. Wenn keine pfx-Tools verfügbar sind oder ein Aufruf 401/403 liefert: den Nutzer die
   Verbindung über den OAuth-Dialog herstellen lassen. Dort gibt er ein:
   - pfx-MCP-API-Key von https://mcp.pfx.ch/request-api-key.html (nur der Key)
   - Proffix-Benutzer, Passwort, URL, Port (Standard 11011), Datenbank
2. API-Key und Passwort nie im Chat verlangen und nie wiederholen.
3. Key, Datenbank und listeNr nie erfinden.

## Mandanten

Mehrere Mandanten sind als Verbindungsprofile auf dem Server möglich. Mit
`list_connection_profiles` anzeigen, mit `set_active_profile` wechseln.
Schreibvorgänge nur wenn das aktive Profil nicht `readOnly` ist.

## Smoke

Sobald der Nutzer bestätigt, dass die Verbindung steht, einen Lese-Aufruf ausführen
(z. B. eine Adresssuche mit einem Namen, den er nennt). Reports
(px_generate_report) einzeln ausführen. Anlegen, Ändern und Löschen erst nach
ausdrücklicher Bestätigung.

## Regeln

- `compare_profiles` nur zum Lesen, nicht zum Kopieren zwischen Mandanten.