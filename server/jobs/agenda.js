const Agenda = require('agenda');
require('dotenv').config();
const agenda = new Agenda({ db: { address: process.env.MONGO_JOBS_CONNECTION_STRING } });

module.exports = agenda;