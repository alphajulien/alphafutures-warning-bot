const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '8212740282:AAGd7cqoJtZowjzuxDYJ9ZQa7lR0R-1TaOk';
const bot = new TelegramBot(token, { polling: true });

const WARNING_MESSAGE = `🚨 *Public Service Announcement* 🚨

Alpha Futures ist nach aktuellem Stand ein Ponzi-ähnlicher Scam. Wir haben belastbare Nachweise, inklusive detaillierter Screenshots und Transaktionsbelege, die das operative Muster eindeutig bestätigen.

Bitte prüft sofort eure DMs. Dort findet ihr die vollständige Aufarbeitung, die einzelnen Beweisführungen sowie die Handlungsempfehlungen, wie ihr eure Risiken jetzt strukturiert mitigiert.

Bleibt wachsam und validiert jede Information kritisch.

@alphaponzi`;

const VIDEO_URL = 'https://cdn-cf-east.streamable.com/video/mp4/cjdik2.mp4?Expires=1765310437549&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=LKnlqAuZLKJcIIXxkKJBf24AjE8B5dM~0a3gbCjY3beeTqMFkdfIljOpdjaNzfjhYj5CNTJn44fjoPxyZH652aQ0CJDI9FaodW4B4SAI3~JHJN-74hNPyaHS~LxQE3Bhd2jgvjEUtBEJ5VJW4UooNbp5ZnLkyLzbtbwoLBb76ZYLYB2mpiBfrvfHVvv4AduTo3T0--CnRlhXnP~WG74j7P-kQ8aZeQP6n7tB~I1ssUreZvat0HoWWRZtfh7-SAtLDQssMjjE966nlu09sJLK6HdNleev~OYhRpruT1pAW6AX3XyrhHzSa4hTZpHpPSFtUp0Ff2K8d5KD5SIaWd0SnQ__';

// Sende Warnung an alle Nutzer, die den Bot starten
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    // Sende Video mit Warnung
    await bot.sendVideo(chatId, VIDEO_URL, {
      caption: WARNING_MESSAGE,
      parse_mode: 'Markdown'
    });
    
    console.log(`Warnung gesendet an User: ${chatId}`);
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    
    // Fallback: Nur Text senden, falls Video fehlschlägt
    await bot.sendMessage(chatId, WARNING_MESSAGE, { parse_mode: 'Markdown' });
  }
});

// Sende Warnung auch bei jeder anderen Nachricht
bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) return; // Ignoriere Commands
  
  const chatId = msg.chat.id;
  
  try {
    await bot.sendVideo(chatId, VIDEO_URL, {
      caption: WARNING_MESSAGE,
      parse_mode: 'Markdown'
    });
    
    console.log(`Warnung gesendet an User: ${chatId}`);
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    await bot.sendMessage(chatId, WARNING_MESSAGE, { parse_mode: 'Markdown' });
  }
});

console.log('⚠️  AlphaFutures Warning Bot gestartet...');
console.log('Bot sendet Scam-Warnung an alle User.');
