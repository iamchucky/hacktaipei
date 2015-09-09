var m = require('./m');

module.exports = {
  getAll: function() {
    return m.Answer.forge().fetch();
  },

  get: function(id) {
    return m.Answer.where({ id: id }).fetch({ withRelated: ['comments'] });
  },

  create: function(data) {
    return m.Answer.forge(data).save();
  },

  remove: function(post) {
    return m.Answer.where({ id: post.id }).destroy();
  }
};
