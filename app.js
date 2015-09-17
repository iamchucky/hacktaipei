// When the app starts
var express = require('express');
var app = express();
var db = require('./database');

// body-parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('./public'));

app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var cookieParser = require('cookie-parser');
app.use(cookieParser());

function addComment(req, res, post_id, answer_id, user_id, content) {
  var store = {
    post_id: post_id,
    answer_id: answer_id,
    user_id: user_id,
    content: content,
    score: 0
  };

  db.comment.create(store)
    .then(function() {
      res.json({ status: 'good' });
    })
    .catch(logErrAndSend(res, '儲存留言出錯'));
}

function castVote(req, res, type, postId, userId, value) {
  db.score.castVote(type, postId, userId, value)
    .then(function(p) {
      res.redirect('back');
    })
    .catch(logErrAndRedirect(res, 'back'));
}

var postHandler = {
  'comment-main': function(req, res, data) {
    addComment(req, res, data.postId, null, 'yangchuck@gmail.com', data.content);
  },

  'comment-ans': function(req, res, data) {
    addComment(req, res, null, data.answerId, 'yangchuck@gmail.com', data.content);
  },

  'answer': function(req, res, data) {
    var store = {
      post_id: data.postId,
      user_id: 'yangchuck@gmail.com',
      content: data.content,
      score: 0
    };

    db.answer.create(store)
      .then(function() {
        res.json({ status: 'good' });
      })
      .catch(logErrAndSend(res, '儲存回答出錯'));
  },

  'vote-main': function(req, res, data) {
    castVote(req, res, 'post', data.postId, data.userId, data.updown == 'up' ? 1:-1);
  },

  'vote-ans': function(req, res, data) {
    castVote(req, res, 'answer', data.answerId, data.userId, data.updown == 'up' ? 1:-1);
  }

};

app.route('/posts')
  .get(function(req, res) {
    db.post.getAll()
      .then(function(c) {
        res.json(c.toJSON());
      })
      .catch(logErrAndSend(res, '無法取得問題列表'));
  });

app.route('/post/:id')
  .get(function(req, res) {
    if (req.params.id == 'new') {
      return res.render('views/newPost');
    }

    var id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.redirect('/');
    }

    db.post.get(id)
      .then(function(post) {
        res.json(post);
      })
      .catch(logErrAndSend(res, '無法取得文章: '+id));
  })
  .post(function(req, res) {
    if (req.params.id == 'new') {
      return handleNewPost(req, res);
    }

    var id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.redirect('/');
    }

    var body = req.body;
    if (!postHandler[body.type]) {
      console.log('invalid post');
      return res.json({ error: 'invalid post', msg: '無效post'});
    }

    body.postId = id;
    body.userId = 'yangchuck@gmail.com';
    postHandler[body.type](req, res, body);
  });

function handleNewPost(req, res) {
  // check req.body.title and content
  var body = req.body;
  var data = {
    user_id: 'yangchuck@gmail.com',
    title: body.title,
    content: body.content,
    location: body.location,
    score: 0
  };
  if (body.lat && body.lng) {
    data.lat = body.lat;
    data.lng = body.lng;
  }

  db.post.create(data)
    .then(function(p) {
      var post = p.toJSON();
      res.json({ id: post.id });
    })
    .catch(logErrAndSend(res, '儲存提問出錯'));
}

function logErrAndSend(res, msg) {
  return function(err) {
    console.log(err);
    res.json({ error: err, msg: msg });
  };
}

function logErrAndRedirect(res, path) {
  return function(err) {
    console.log(err);
    res.redirect('/');
  };
}

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
