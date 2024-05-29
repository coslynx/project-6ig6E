// File: src/commands/moderationCommands.js (JavaScript)

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { autoMute, autoKick, autoBan } = require('../features/automatedModeration');

module.exports = class ModerationCommands extends Command {
  constructor(client) {
    super(client, {
      name: 'moderation',
      group: 'moderation',
      memberName: 'moderation',
      description: 'Various moderation commands for managing the server.',
      examples: ['!mute @user', '!kick @user', '!ban @user'],
      args: [
        {
          key: 'action',
          prompt: 'Which action do you want to perform? (mute, kick, ban)',
          type: 'string',
          validate: action => ['mute', 'kick', 'ban'].includes(action.toLowerCase())
        },
        {
          key: 'user',
          prompt: 'Which user do you want to perform the action on?',
          type: 'user'
        }
      ]
    });
  }

  async run(message, { action, user }) {
    if (action === 'mute') {
      autoMute(user);
      message.channel.send(`${user} has been muted.`);
    } else if (action === 'kick') {
      autoKick(user);
      message.channel.send(`${user} has been kicked.`);
    } else if (action === 'ban') {
      autoBan(user);
      message.channel.send(`${user} has been banned.`);
    }
  }
};