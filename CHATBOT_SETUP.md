## AI Chatbot - Setup & Troubleshooting Guide

### Behobene Probleme:

1. **Bildschirmrand-Problem**: ✓ Fixiert
   - Chat-Fenster war `w-full` auf mobil
   - Jetzt `w-[calc(100vw-32px)]` um Overflows zu verhindern

2. **iOS Auto-Zoom**: ✓ Fixiert
   - Input-Feld war `text-sm` (14px)
   - Jetzt `text-base` (16px) - iOS zoomed nicht rein

3. **Keine Antworten**: ✓ Fixiert
   - API fehlte `originalMessages` Parameter
   - Besserere Error-Handling hinzugefügt

### Nächste Schritte - Knowledge Base Aktivieren:

Du **musst** die Knowledge Base mit deinem Content füllen, damit der Chatbot Fragen beantworten kann.

**Option 1: Über Admin-Seite (Empfohlen)**
1. Gehe zu: `https://deine-domain.ch/admin/chatbot-setup`
2. Klicke "Populate Knowledge Base"
3. Warte auf die Bestätigung
4. Fertig! Der Chatbot antwortet jetzt mit xelvetec-Inhalten

**Option 2: Über API-Call**
```bash
curl -X POST https://deine-domain.ch/api/admin/populate-kb \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo"
```

### Was passiert beim Setup:
- Deine Dienste (Webdesign, SEO, E-Commerce, etc.) werden indexiert
- AI erstellt Vector-Embeddings für semantische Suche
- Content wird in Supabase gespeichert
- Chatbot kann relevante Infos zu Kundenfragen finden

### Der Chatbot wird dann:
✓ Deutsch/Türkisch/Englisch perfekt beherrschen
✓ Automatisch die richtige Sprache erkennen
✓ Mit aktuellen Preisen & Services antworten
✓ Support-Anfragen korrekt handeln
✓ 24/7 verfügbar sein

### Wenn der Chatbot immer noch nicht antwortet:
1. Prüfe Browser-Console auf Fehler (F12)
2. Überprüfe: Wurde Knowledge Base populiert?
3. Checke: Ist OpenAI API-Key konfiguriert?
4. Versuche Hard-Refresh (Ctrl+Shift+R)

Viel Erfolg! 🚀
