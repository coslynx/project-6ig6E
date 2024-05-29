// File: src/features/roleManagement.js (JavaScript)

const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client();

// Role management logic
client.on('message', async message => {
    if (message.content.startsWith('!addRole')) {
        const roleName = message.content.split(' ')[1];
        const role = message.guild.roles.cache.find(role => role.name === roleName);

        if (!role) {
            return message.reply('Role not found!');
        }

        try {
            await message.member.roles.add(role);
            message.reply(`Added ${roleName} role successfully!`);
        } catch (error) {
            console.error(error);
            message.reply('Error adding role. Please try again.');
        }
    } else if (message.content.startsWith('!removeRole')) {
        const roleName = message.content.split(' ')[1];
        const role = message.guild.roles.cache.find(role => role.name === roleName);

        if (!role) {
            return message.reply('Role not found!');
        }

        try {
            await message.member.roles.remove(role);
            message.reply(`Removed ${roleName} role successfully!`);
        } catch (error) {
            console.error(error);
            message.reply('Error removing role. Please try again.');
        }
    }
});

client.login('YOUR_BOT_TOKEN'); // Replace 'YOUR_BOT_TOKEN' with your actual bot token

module.exports = client;