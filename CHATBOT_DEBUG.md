# Chatbot Debugging Guide

## Zu überprüfende Schritte:

### 1. Öffne die Browser Developer Console
- Drücke F12 oder Cmd+Option+I
- Gehe zum Tab "Network" oder "Console"

### 2. Klicke auf die Chat-Bubble
- Sollte in der unteren rechten Ecke sein
- Widget sollte sich öffnen

### 3. Schreibe eine Test-Nachricht
- Z.B. "Was sind eure Services?"
- Beobachte in der Console die Debug-Logs

### 4. Überprüfe die Netzwerk-Logs
- Gehe zum Tab "Network" in der Developer Console
- Suche nach `/api/chat` Request
- Klicke drauf und schaue die Response an
- Sollte Text enthalten sein, nicht nur Fehler

## Was du sehen solltest:

**In der Console:**
```
[v0] Chat API called at ...
[v0] Messages received: 1 messages
[v0] Last message role: user
[v0] User message: Was sind eure Services?
[v0] Detected language: de
[v0] Fetching context from knowledge base...
[v0] Context retrieved, length: ...
[v0] System prompt built, length: ...
[v0] Converting messages to model format...
[v0] Converted to ... model messages
[v0] Starting stream with model: openai/gpt-4o
[v0] Stream created, sending response
```

## Wenn etwas schiefgeht:

1. **Keine Chat-Bubble sichtbar?** - Überprüfe Browser-Console auf Fehler
2. **Nachricht wird nicht gesendet?** - Öffne Network Tab und schau den Request
3. **Error in Console?** - Kopiere den kompletten Error-Text
4. **Keine Antwort von API?** - Überprüfe ob `/api/chat` 200er Status-Code zurückgibt

## Alternative Test ohne Widget:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hallo, wer bist du?"}
    ]
  }'
```

Sollte einen Stream mit der Antwort zurückgeben.
