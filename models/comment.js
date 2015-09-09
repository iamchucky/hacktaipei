var m = require('./m');

module.exports = {
  getAll: function() {
    return m.Comments.forge().fetch();
  },

  get: function(id) {
    return m.Comment.where({ id: id }).fetch();
  },

  create: function(data) {
    return m.Comment.forge(data).save();
  },

  remove: function(post) {
    return m.Comment.where({ id: post.id }).destroy();
  }
};
