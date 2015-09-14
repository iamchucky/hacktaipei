var m = require('./m');

module.exports = {
  getAll: function() {
    return m.Scores.forge().fetch();
  },

  get: function(id) {
    return m.Score.where({ id: id }).fetch();
  },

  create: function(data) {
    return m.Score.forge(data).save();
  },

  castVote: function(type, id, userId, value) {
    var Post = m.Post;
    if (type == 'answer') {
      Post = m.Answer;
    }
    return m.bookshelf.transaction(function(t) {
      return Post.where({ id: id })
        .fetch({ transacting: t, withRelated: [ 'score' ] })
        .then(function(post) {
          var p = post.toJSON();
          var score = post.related('score').toJSON();
          // user has already voted
          if (score.users[userId]) {
            throw 'user '+userId+' already voted';
          }

          var newScore = score.score + value;
          score.users[userId] = true;
          return m.Score.forge(score).save({ score: newScore, users: score.users }, { patch: true, transacting: t });
        });
    });
  },

  remove: function(post) {
    return m.Score.where({ id: post.id }).destroy();
  }
};
