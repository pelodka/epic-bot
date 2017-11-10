require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const schedule = require("node-schedule");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const epicChatId = process.env.EPIC_CHAT;
const myChatId = process.env.MY_CHAT;
const voblaPicUrl = "https://i.imgur.com/Uai8cr0.jpg";

const replyToTrash = "Мы не сделали скандала —\n"
  + "Нам вождя недоставало:\n"
  + "Настоящих буйных мало —\n"
  + "Вот и нету вожаков.";

const replyToLiberast = "Чё ты как чмо, чё ты как чёрт, чё ты не патриот?\n"
  + "Ты чё волчёнок, ты дохуя умный? Слышишь ты чё нах?\n"
  + "Ты же крещёный, ну ты ж не копчёный, ну вот и всё нах\n"
  + "Хочешь быть порабощённым?\n"
  + "Слышь я тебе повторяю ещё раз";

const replyToStart = "Список команд:\n/start\n/vobla\n/chatid\n/time";

const helloMessage =
  "Вечер в хату, часик в радость, чифир в сладость.\n" + replyToStart;

const repliesToHitler = [
  "Адольф молодец!",
  "Так держать, пацаны. Правильные вещи обсуждаете.",
  "Фюрер жив в наших сердцах!",
  "Он был прав. Германия действительно стала жить намного лучше после войны.",
  "Зига!"
];

const replyToAlien = "Уважаемый редактор!\n"
  + "Может, лучше — про реактор?\n"
  + "Там, про любимый лунный трактор?\n"
  + "Ведь нельзя же! — год подряд\n"
  + "То тарелками пугают —\n"
  + "Дескать, подлые, летают,\n"
  + "То у вас собаки лают,\n"
  + "То руины говорят!";

function sendVoblaToChat(chatid) {
  bot.sendPhoto(chatid, voblaPicUrl, {
    caption: "#vobla\nПриятного аппетита."
  });
}

function getTime() {
  let date = new Date();
  return date.getHours() + ':' + date.getMinutes();
}

const app = express();

app.get("/", function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Web server started at http://%s:%s", host, port);
});

function getRandomInt(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

bot.on("message", msg => {
  let liberast = "либера";
  let hitler = "гитлер";
  let gnoy = "гнойн";
  let alien = "инопланет";
  let trash = "срач";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(hitler)
  ) {
    bot.sendMessage(
      msg.chat.id,
      repliesToHitler[getRandomInt(repliesToHitler.length)]
    );
  } else if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(alien)
  ) {
    bot.sendMessage(msg.chat.id, replyToAlien);
  } else if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(trash)
  ) {
    bot.sendMessage(msg.chat.id, replyToTrash);
  } else if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(gnoy)
  ) {
    bot.sendMessage(msg.chat.id, "ОКСИ КОРОЛЬ РУССКАВА РЭПА СУКА!");
  } else if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(liberast)
  ) {
    bot.sendMessage(msg.chat.id, replyToLiberast);
  }
});

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, startReply);
});

bot.onText(/\/vobla/, msg => {
  sendVoblaToChat(msg.chat.id);
});

bot.onText(/\/chatid/, msg => {
  bot.sendMessage(msg.chat.id, "Your chat id is:\n" + msg.chat.id);
});

bot.onText(/\/time/, msg => {
  bot.sendMessage(msg.chat.id, getTime());
});

var j = schedule.scheduleJob("0 0 12 * * 1-5", function () {
  sendVoblaToChat(process.env.EPIC_CHAT);
});

bot.sendMessage(epicChatId, helloMessage);
