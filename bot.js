var TelegramBot = require('node-telegram-bot-api');

var token = '';
var bot = new TelegramBot(token, { polling: true });
var away_messages = new Map();

bot.onText(/\/away (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var resp = match[1];
    away_messages.set(msg.chat.username, resp)

    bot.sendMessage(chatId, resp);
});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;

    if(away_messages.get(msg.chat.username))
        bot.sendMessage(chatId, msg.chat.first_name + " is away: " + away_messages.get(msg.chat.username));
});