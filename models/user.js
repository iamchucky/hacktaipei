var config = require('../config');
var knex = require('knex')(config.db);
var bs = require('bookshelf')(knex);

var User = bs.Model.extend({ 
  tableName: 'users',
  hasTimestamps: ['created_at']
});

var Users = bs.Collection.extend({ model: User });

module.exports = {
  getAll: function() {
    return Users.forge().fetch();
  },

  get: function(id) {
    return User.where({ id: id }).fetch();
  },

  create: function(id, name) {
    return User.forge({
      id: id,
      name: name
    }).save();
  },

  remove: function(id) {
    return User.where({ id: id }).destroy();
  }
};
