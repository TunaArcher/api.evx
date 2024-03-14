require('dotenv/config');

const { logger } = require('./logger');

const { DB_HOST, DB_PORT, DB_USERNAME, DB_USERNAME_PASSWORD, DB_NAME, JWT_SECRET_KEY } = process.env;

const requiredCredentials = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_USERNAME_PASSWORD', 'DB_NAME', 'JWT_SECRET_KEY'];

for (const credential of requiredCredentials) {
    if (process.env[credential] === undefined) {
        logger.error(`Missing required crendential: ${credential}`);
        process.exit(1);
    }
}

module.exports = {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_USERNAME_PASSWORD,
    DB_NAME,
    JWT_SECRET_KEY,
};