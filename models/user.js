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
    var query = Promise.resolve();
    var u = new m.User({id: user.id});
    if (u.isNew()) {
      // create user
      query.then(function() {
        return m.User.forge(user).save();
      });
    }

    return query;
  },

  create: function(id, name) {
    return m.User.forge({
      id: id,
      name: name
    }).save();
  },

  remove: function(id) {
    return m.User.where({ id: id }).destroy();
  }
};
