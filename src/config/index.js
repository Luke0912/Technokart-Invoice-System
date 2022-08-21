const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const config = { port: process.env.PORT, mongodb_url: process.env.DB_URL };

module.exports = config