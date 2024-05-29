// File: src/commands/loggingCommands.js (JavaScript)

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { loggingSystem } = require('../features/loggingSystem');

module.exports = class LoggingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'logging',
            aliases: ['log', 'logconfig'],
            group: 'moderation',
            memberName: 'logging',
            description: 'Configure logging settings for the bot.',
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'logChannel',
                    prompt: 'Please mention the logging channel.',
                    type: 'channel',
                },
            ],
        });
    }

    async run(message, { logChannel }) {
        // Check if the user has the required permissions
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('You do not have permission to use this command.');
        }

        // Update the logging channel in the database
        loggingSystem.setLogChannel(message.guild.id, logChannel.id);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Logging Configuration')
            .setDescription(`Logging channel set to ${logChannel}`);

        return message.say(embed);
    }
};