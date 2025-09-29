import express from "express";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN; // токен из Railway (переменные окружения)
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://savich18423.github.io/friendly-meme/profile.html"; // твой WebApp

  bot.sendMessage(chatId, "✅ Привет! Вот твой профиль:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть профиль 🌌", web_app: { url } }]
      ]
    }
  });
});

// Чтобы Railway не засыпал
const app = express();
app.get("/", (req, res) => res.send("🚀 Bot is running!"));
app.listen(3000, () => console.log("Server started on port 3000"));
