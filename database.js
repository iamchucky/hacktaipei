var config = require('./config');
var db = require('require-dir')('./models');

db.knex = require('knex')(config.db);
db.bookshelf = require('bookshelf')(db.knex);

module.exports = db;
