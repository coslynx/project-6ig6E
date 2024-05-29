// src/features/chatClear.js (JavaScript)

// Import necessary modules and dependencies
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('../config.json');

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Define a command to clear chat history and delete messages
client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!clear') {
        try {
            const fetched = await message.channel.messages.fetch({ limit: 100 });
            message.channel.bulkDelete(fetched);
            message.channel.send('Chat history cleared successfully!');
        } catch (error) {
            console.error('Error clearing chat history:', error);
            message.channel.send('An error occurred while clearing chat history.');
        }
    }
});

// Login to Discord with your app's token
client.login(token);