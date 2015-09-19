var m = require('./m');
var Promise = require('bluebird');

module.exports = {
  getAll: function() {
    return m.Users.forge().fetch();
  },

  get: function(id) {
    return m.User.where({ id: id }).fetch();
  },

  createIfNotExist: function(user) {
    return m.User.where({ id: user.id }).fetch()
      .then(function(u) {
        if (!u) {
          return m.User.forge().save(user, { method: 'insert' });
        }
      });
  },

  create: function(id, name) {
    var user = {
      id: id,
      name: name
    };
    return m.User.forge().save(user, { method: 'insert' });
  },

  remove: function(id) {
    return m.User.where({ id: id }).destroy();
  }
};
