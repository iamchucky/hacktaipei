var m = require('./m');
var Promise = require('bluebird');

module.exports = {
  getAll: function() {
    return m.Comments.forge().fetch();
  },

  get: function(id) {
    return m.Comment.where({ id: id }).fetch({ withRelated: ['owner']})
      .then(function(c) {
        var cjson = c.toJSON();
        cjson.owner = c.related('owner');
        return Promise.resolve(cjson);
      });
  },

  create: function(data) {
    return m.Comment.forge(data).save();
  },

  remove: function(post) {
    return m.Comment.where({ id: post.id }).destroy();
  }
};
