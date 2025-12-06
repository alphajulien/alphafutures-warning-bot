const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = process.env.TELEGRAM_BOT_TOKEN || '8212740282:AAGd7cqoJtZowjzuxDYJ9ZQa7lR0R-1TaOk';
const bot = new TelegramBot(token, { polling: true });

// HTTP Server für Koyeb Web Service (health check)
const PORT = process.env.PORT || 8000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AlphaFutures Warning Bot is running!\n');
});

server.listen(PORT, () => {
  console.log(`HTTP Server läuft auf Port ${PORT}`);
});

const WARNING_MESSAGE = `🚨 *Public Service Announcement* 🚨

Alpha Futures ist nach aktuellem Stand ein Ponzi-ähnlicher Scam. Wir haben belastbare Nachweise, inklusive detaillierter Screenshots und Transaktionsbelege, die das operative Muster eindeutig bestätigen.

Bitte prüft sofort eure DMs. Dort findet ihr die vollständige Aufarbeitung, die einzelnen Beweisführungen sowie die Handlungsempfehlungen, wie ihr eure Risiken jetzt strukturiert mitigiert.

Bleibt wachsam und validiert jede Information kritisch.

@alphaponzi

🎥 Video-Beweis: streamable.com/cjdik2`;

// Sende Warnung an alle Nutzer, die den Bot starten
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    // Sende nur Text mit Video-Link (einfacher und zuverlässiger)
    await bot.sendMessage(chatId, WARNING_MESSAGE, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: false
    });
    
    console.log(`✅ Warnung gesendet an User: ${chatId}`);
  } catch (error) {
    console.error('❌ Fehler beim Senden:', error.message);
  }
});

// Sende Warnung auch bei jeder anderen Nachricht
bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) return; // Ignoriere Commands
  
  const chatId = msg.chat.id;
  
  try {
    await bot.sendMessage(chatId, WARNING_MESSAGE, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: false
    });
    
    console.log(`✅ Warnung gesendet an User: ${chatId}`);
  } catch (error) {
    console.error('❌ Fehler beim Senden:', error.message);
  }
});

console.log('⚠️  AlphaFutures Warning Bot gestartet...');
console.log('Bot sendet Scam-Warnung an alle User.');
