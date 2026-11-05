---
name: get-started
description: Ersteinrichtung Proffix Px5 (pfx-mcp) / first-run setup. Use when the user wants to connect Proffix, search addresses, or run an ERP query. API key is mandatory. Reply in the user's language.
---

# Proffix Px5 (pfx-mcp)

## Sprache

Antworte immer in der Sprache der letzten Nutzernachricht. Deutsch bleibt Deutsch, Englisch bleibt Englisch, Französisch bleibt Französisch. Wechsle nicht ins Englische, nur weil diese Datei gemischt ist. Fachbegriffe (API-Key, Proffix, Datenbank, Port) dürfen bleiben.

## Vor jedem Tool-Aufruf

Der pfx-MCP-API-Key ist Pflicht. Es gibt keinen Zugang ohne Key.

1. Wenn keine pfx-Tools da sind oder ein Aufruf 401/403 liefert, hier stoppen und zur Plugin-Konfiguration schicken:
   - API-Key von https://mcp.pfx.ch/request-api-key.html (nur der Key, ohne `Bearer`; die Bridge setzt das selbst)
   - Proffix-Benutzer, Passwort, URL, Port (Standard 11011), Datenbank
2. Key und Passwort nie im Chat verlangen und nie wiederholen.
3. Key, Datenbank und `listeNr` nie erfinden.

## Smoke

Sobald der Nutzer bestätigt, dass Key und Proffix-Zugang in der Plugin-Konfiguration stehen, einen Lese-Aufruf ausführen (zum Beispiel eine Adresssuche mit einem Namen, den er nennt). Reports (`px_generate_report`) einzeln ausführen. Anlegen, Ändern und Löschen erst nach ausdrücklicher Bestätigung.
