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

  castVote: function(id, value) {
    return m.bookshelf.transaction(function(t) {
      return m.Answer.where({ id: id })
        .fetch({ transacting: t })
        .then(function(p) {
          var newScore = p.get('score') + value;
          return m.Answer.forge(p).save({ score: newScore }, { patch: true, transacting: t });
        });
    });
  },

  remove: function(post) {
    return m.Answer.where({ id: post.id }).destroy();
  }
};
