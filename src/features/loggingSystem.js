// loggingSystem.js

// Import necessary packages
const { Client, Intents } = require('discord.js');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Create a logger instance
const logger = createLogger({
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs.log' })
  ]
});

// Function to log moderation actions
const logModerationAction = (moderator, action, target, reason) => {
  logger.info(`${moderator.tag} ${action} ${target.tag} for: ${reason}`);
};

// Function to log anti-spam actions
const logAntiSpamAction = (user, action) => {
  logger.info(`${action} taken against ${user.tag} for spamming`);
};

// Function to log user verification
const logUserVerification = (user) => {
  logger.info(`${user.tag} has been verified`);
};

// Export the logging functions
module.exports = { logModerationAction, logAntiSpamAction, logUserVerification};