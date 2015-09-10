var m = require('./m');

function latestOrdering(qb) {
  qb.orderByRaw('created_at DESC, score DESC');
}

module.exports = {
  getAll: function() {
    return m.Posts.forge().fetch();
  },

  get: function(id) {
    return m.Post.where({ id: id }).fetch({ 
      withRelated: [ {
        'comments': latestOrdering,
        'answers': latestOrdering,
        'answers.comments': latestOrdering
      } ] });
  },

  create: function(data) {
    return m.Post.forge(data).save();
  },

  castVote: function(id, value) {
    return m.bookshelf.transaction(function(t) {
      return m.Post.where({ id: id })
        .fetch({ transacting: t })
        .then(function(p) {
          var newScore = p.get('score') + value;
          return m.Post.forge(p).save({ score: newScore }, { patch: true, transacting: t });
        });
    });
  },

  remove: function(post) {
    return m.Post.where({ id: post.id }).destroy();
  }
};
