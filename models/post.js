var m = require('./m');
var Promise = require('bluebird');

function latestOrdering(qb) {
  qb.orderByRaw('created_at DESC');
}

module.exports = {
  getAll: function() {
    return m.Posts.forge().query(latestOrdering).fetch({ withRelated: ['owner'] })
      .then(function(c) {
        var out = [];
        for (var i = 0; i < c.models.length; ++i) {
          var r = c.models[i].toJSON();
          r.owner = c.models[i].related('owner').toJSON();
          out.push(r);
        }
        return out;
      });
  },

  get: function(id) {
    return m.Post.where({ id: id }).fetch({ 
      withRelated: [ {
        'owner': function() {},
        'comments': latestOrdering,
        'comments.owner': function() {},
        'answers': latestOrdering,
        'answers.comments': latestOrdering,
        'answers.comments.owner': function() {},
        'answers.score': function() {},
        'score': function() {}
      } ] })
    .then(function(post) {
      var p = post.toJSON();
      p.owner = post.related('owner').toJSON();
      p.comments = post.related('comments').toJSON();
      p.answers = post.related('answers').toJSON();
      p.score = post.related('score').toJSON();
      p.score = p.score.score;
      for (var i = 0; i < p.answers.length; ++i) {
        p.answers[i].score = p.answers[i].score.score;
      }
      return Promise.resolve(p);
    });
  },

  create: function(data) {
    var score = {
      users: {},
      score: data.score
    };

    var newPost;
    delete data.score;

    return m.Post.forge(data).save()
      .then(function(p) {
        newPost = p;
        var postId = p.get('id');
        score.post_id = postId;

        return m.Score.forge(score).save();
      })
      .then(function() {
        return Promise.resolve(newPost);
      });
  },

  remove: function(post) {
    return m.Post.where({ id: post.id }).destroy();
  }
};
