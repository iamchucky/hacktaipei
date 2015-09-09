var m = require('./m');

module.exports = {
  getAll: function() {
    return m.Posts.forge().fetch();
  },

  get: function(id) {
    return m.Post.where({ id: id }).fetch({ withRelated: ['comments', 'answers', 'answers.comments'] });
  },

  create: function(data) {
    return m.Post.forge(data).save();
  },

  remove: function(post) {
    return m.Post.where({ id: post.id }).destroy();
  }
};
