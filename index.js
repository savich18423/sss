import express from "express";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;
const CHANNEL_ID = "@CaseGalaxy"; // наш канал

const bot = new TelegramBot(token, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "👋 Привет! Чтобы начать играть в CaseGalaxy 🚀, подпишись на наш канал:\n👉 https://t.me/CaseGalaxy",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "✅ Проверить подписку", callback_data: "check_sub" }]
        ]
      }
    }
  );
});

// Проверка подписки
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "check_sub") {
    try {
      const member = await bot.getChatMember(CHANNEL_ID, chatId);

      if (
        member.status === "member" ||
        member.status === "administrator" ||
        member.status === "creator"
      ) {
        // Подписан
        bot.sendMessage(chatId, "✅ Отлично! Доступ разрешён 🎉", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🎮 Играть",
                  web_app: { url: "https://savich18423.github.io/friendly-meme/profile.html" }
                }
              ]
            ]
          }
        });
      } else {
        // Не подписан
        bot.sendMessage(
          chatId,
          "❌ Вы ещё не подписаны! Подпишитесь на канал 👉 https://t.me/CaseGalaxy и попробуйте снова."
        );
      }
    } catch (e) {
      bot.sendMessage(chatId, "⚠️ Ошибка проверки, попробуйте позже.");
      console.error(e);
    }
  }
});

// Express для Railway
const app = express();
app.get("/", (req, res) => res.send("Bot is running ✅"));
app.listen(3000, () => console.log("Server started"));
