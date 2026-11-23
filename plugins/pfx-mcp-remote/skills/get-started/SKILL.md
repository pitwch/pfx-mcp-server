---
name: get-started
description: Ersteinrichtung Proffix Px5 (pfx-mcp) über den Remote-Connector. Nutzen, wenn jemand Proffix per OAuth verbinden oder eine erste Lese-Abfrage starten will. Antworten in der Sprache der letzten Nutzernachricht.
---

# Proffix Px5 (pfx-mcp) — Remote

## Sprache

Antworte immer in der Sprache der letzten Nutzernachricht. Deutsch bleibt Deutsch, Englisch bleibt Englisch. Fachbegriffe (API-Key, Proffix, Datenbank, Port) dürfen bleiben.

## Anmeldung (OAuth)

Dieser Connector läuft remote auf https://mcp.pfx.ch. Die Anmeldung erfolgt über OAuth auf der sicheren Connect-Seite von mcp.pfx.ch — **nicht** im Chat.

1. Wenn keine pfx-Tools verfügbar sind oder ein Aufruf 401/403 liefert: die Person die Verbindung über den OAuth-Dialog herstellen lassen. Dort gibt sie API-Key und Proffix-Zugangsdaten selbst ein.
2. API-Key und Passwort nie im Chat verlangen und nie wiederholen.
3. Key, Datenbank und `listeNr` nie erfinden.

## Rechte

Der Connector erbt die Proffix-ERP-Berechtigungen des verbundenen Benutzers. Ohne Proffix-Recht für ein Modul (z. B. Lohnbuchhaltung) sind diese Daten auch hier nicht sichtbar.

## Smoke

Sobald die Verbindung steht, einen Lese-Aufruf ausführen (z. B. Adresssuche mit einem Namen, den die Person nennt). Reports (`px_generate_report`) einzeln ausführen. Anlegen, Ändern und Löschen erst nach ausdrücklicher Bestätigung. Keine Lohn-/AHV-/Payslip-Workflows in diesem Onboarding anleiten.