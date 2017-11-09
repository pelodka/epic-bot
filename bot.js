const TelegramBot = require("node-telegram-bot-api");
const express = require('express');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const epicChat = process.env.EPIC_CHAT;
const myChatId = process.env.MY_CHAT;
const voblaPicUrl = "https://i.imgur.com/Uai8cr0.jpg";
const helloMessage =
  "Вечер в хату, часик в радость, чифир в сладость.\nСписок команд:\n/start\n/vobla\n/chatid";
const repliesToHitler = [
  "Адольф молодец!",
  "Так держать, пацаны. Правильные вещи обсуждаете.",
  "Фюрер жив в наших сердцах!",
  "Он был прав. Германия действительно стала жить намного лучше после войны.",
  "Зига."
];

const app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

bot.on("message", msg => {
  let liberast = "либераст";
  let hitler = "гитлер";
  let gnoy = "гнойн"
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(hitler)
  ) {
    bot.sendMessage
      (msg.chat.id, repliesToHitler[getRandomInt(repliesToHitler.length)]);
  } else if (msg.text
    .toString()
    .toLowerCase()
    .includes(gnoy)) {
    bot.sendMessage(msg.chat.id, "ОКСИ КОРОЛЬ РУССКАВА РЭПА СУКА!");
  }
  else if (msg.text
    .toString()
    .toLowerCase()
    .includes(liberast)) {
    bot.sendMessage(msg.chat.id, "Сам такой!");
  }
});

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, "Бизнес ланч в вобле:\n /vobla");
});

bot.onText(/\/vobla/, msg => {
  bot.sendPhoto(msg.chat.id, voblaPicUrl, {
    caption: "#vobla\nПриятного аппетита."
  });
});

bot.onText(/\/chatid/, msg => {
  bot.sendMessage(msg.chat.id, "Your chat id is:\n" + msg.chat.id);
});

bot.sendMessage(myChatId, helloMessage);
