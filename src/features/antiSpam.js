// antiSpam.js

const { Client, Intents } = require('discord.js');
const AntiSpam = require('discord.js-anti-spam');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Anti-spam bot is online!');
});

const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning
  kickThreshold: 7, // Amount of messages sent in a row that will cause a kick
  banThreshold: 10, // Amount of messages sent in a row that will cause a ban
  maxInterval: 2000, // Amount of time (ms) in which the messages are sent in
  warnMessage: '{@user}, Please stop spamming.', // Warning message sent to the user
  kickMessage: '**{user_tag}** was kicked for spamming.', // Kick message sent to the user
  banMessage: '**{user_tag}** was banned for spamming.', // Ban message sent to the user
  maxDuplicatesWarning: 7, // Amount of duplicate messages that will cause a warning
  maxDuplicatesKick: 10, // Amount of duplicate messages that will cause a kick
  maxDuplicatesBan: 12, // Amount of duplicate messages that will cause a ban
  deleteMessagesAfterBanForPastDays: 7, // Deletes the message history for the user that was banned
});

client.on('messageCreate', (message) => {
  antiSpam.message(message);
});

client.login('YOUR_DISCORD_BOT_TOKEN');

module.exports = {
  client,
};
