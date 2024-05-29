// File: src/commands/antiSpamCommands.js (JavaScript)

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const AntiSpam = require('discord.js-anti-spam');

module.exports = class AntiSpamCommands extends Command {
  constructor(client) {
    super(client, {
      name: 'anti-spam',
      group: 'moderation',
      memberName: 'anti-spam',
      description: 'Enable or disable the anti-spam feature for the server.',
      userPermissions: ['ADMINISTRATOR'],
    });
  }

  async run(message) {
    const { guild } = message;
    const antiSpam = new AntiSpam(guild);

    // Check if the anti-spam feature is already enabled
    if (antiSpam.isEnabled()) {
      antiSpam.disable();
      message.reply('Anti-Spam feature has been disabled.');
    } else {
      antiSpam.enable();
      message.reply('Anti-Spam feature has been enabled.');
    }
  }
};