// File: src/features/scheduledMessages.js (JavaScript)

const { Client, Intents, MessageEmbed } = require('discord.js');
const { scheduledMessage } = require('discord.js-scheduler');

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!scheduleMessage') {
    // Logic to schedule a message
    const channel = message.channel;
    const scheduledTime = new Date(Date.now() + 60000); // 1 minute from now
    const content = 'This is a scheduled message!';

    scheduledMessage(channel, scheduledTime, content);
    
    const responseEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Scheduled Message')
      .setDescription(`Message scheduled successfully for ${scheduledTime}`);

    message.channel.send({ embeds: [responseEmbed] });
  }
});

client.login('your-bot-token');