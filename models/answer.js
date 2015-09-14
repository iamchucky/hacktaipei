var m = require('./m');

module.exports = {
  getAll: function() {
    return m.Answer.forge().fetch();
  },

  get: function(id) {
    return m.Answer.where({ id: id }).fetch({ withRelated: ['comments', 'score'] })
      .then(function(post) {
        var p = post.toJSON();
        p.score = p.score.score;
        return Promise.reolve(p);
      });
  },

  create: function(data) {
    var score = {
      users: {},
      score: data.score
    };

    delete data.score;
    return m.Answer.forge(data).save()
      .then(function(p) {
        var postId = p.get('id');
        score.answer_id = postId;

        return m.Score.forge(score).save();
      });
  },

  remove: function(post) {
    return m.Answer.where({ id: post.id }).destroy();
  }
};
