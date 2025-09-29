import express from "express";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Обработка /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://savich18423.github.io/friendly-meme/"; // 👉 главная страница (index.html)

  bot.sendMessage(
    chatId,
    "👋 Привет! Тебя приветствует CaseGalaxy 🚀\nОткрывай кейсы и начинай играть!",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎮 Начать играть", web_app: { url } }],
          [{ text: "👤 Мой профиль", web_app: { url: url + "profile.html" } }]
        ]
      }
    }
  );
});

// Express для Railway
const app = express();
app.get("/", (req, res) => res.send("Bot is running ✅"));
app.listen(3000, () => console.log("Server started"));
