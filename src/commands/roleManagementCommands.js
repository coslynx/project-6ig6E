// File: src/commands/roleManagementCommands.js (JavaScript)

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RoleManagementCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: ['assignrole', 'removerole'],
            group: 'roles',
            memberName: 'role',
            description: 'Assign or remove roles for users',
            args: [
                {
                    key: 'action',
                    prompt: 'Would you like to assign or remove a role?',
                    type: 'string',
                    validate: action => action === 'assign' || action === 'remove'
                },
                {
                    key: 'user',
                    prompt: 'Which user do you want to manage roles for?',
                    type: 'user'
                },
                {
                    key: 'role',
                    prompt: 'Which role do you want to assign/remove?',
                    type: 'role'
                }
            ]
        });
    }

    async run(message, { action, user, role }) {
        if (action === 'assign') {
            if (user.roles.cache.has(role.id)) {
                return message.reply('User already has that role!');
            } else {
                try {
                    await user.roles.add(role);
                    return message.reply(`Successfully assigned ${role.name} role to ${user.tag}`);
                } catch (error) {
                    console.error(error);
                    return message.reply('Unable to assign role, please try again later.');
                }
            }
        } else if (action === 'remove') {
            if (!user.roles.cache.has(role.id)) {
                return message.reply('User does not have that role!');
            } else {
                try {
                    await user.roles.remove(role);
                    return message.reply(`Successfully removed ${role.name} role from ${user.tag}`);
                } catch (error) {
                    console.error(error);
                    return message.reply('Unable to remove role, please try again later.');
                }
            }
        }
    }
};