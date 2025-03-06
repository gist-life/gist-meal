const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/BotOperator/Command');
const { Event } = require('../../global_modules/BotOperator/Event');
const { DateTime } = require('../../global_modules/BotOperator/DateTime');

const BotOperator = require('../../global_modules/BotOperator').from(BotManager);
const bot = BotOperator.getCurrentBot();

bot.on(Event.MESSAGE, (chat, channel) => {

});

bot.start();
