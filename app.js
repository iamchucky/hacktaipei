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

function addComment(req, res, isAnswer, data) {
  var store = {
    user_id: data.user.id,
    content: data.content,
    score: 0
  };

  if (isAnswer) {
    store.answer_id = data.answerId;
  } else {
    store.post_id = data.postId;
  }

  db.user.createIfNotExist(data.user)
    .then(function() {
      return db.comment.create(store);
    })
    .then(function() {
      res.json({ status: 'good' });
    })
    .catch(logErrAndSend(res, '儲存留言出錯'));
}

function castVote(req, res, type, postId, user, value) {
  db.user.createIfNotExist(user)
    .then(function() {
      return db.score.castVote(type, postId, user.id, value);
    })
    .then(function(p) {
      res.json({ status: 'good' });
    })
    .catch(logErrAndSend(res, '儲存分數錯誤'));
}

var postHandler = {
  'comment-main': function(req, res, data) {
    addComment(req, res, false, data);
  },

  'comment-ans': function(req, res, data) {
    addComment(req, res, true, data);
  },

  'answer': function(req, res, data) {
    var store = {
      post_id: data.postId,
      user_id: data.user.id,
      content: data.content,
      score: 0
    };

    db.user.createIfNotExist(data.user)
      .then(function() {
        return db.answer.create(store);
      })
      .then(function() {
        res.json({ status: 'good' });
      })
      .catch(logErrAndSend(res, '儲存回答出錯'));
  },

  'vote-main': function(req, res, data) {
    castVote(req, res, 'post', data.postId, data.user, data.updown == 'up' ? 1:-1);
  },

  'vote-ans': function(req, res, data) {
    castVote(req, res, 'answer', data.answerId, data.user, data.updown == 'up' ? 1:-1);
  }

};

app.route('/posts')
  .get(function(req, res) {
    db.post.getAll()
      .then(function(c) {
        res.json(c);
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
    postHandler[body.type](req, res, body);
  });

function handleNewPost(req, res) {
  // check req.body.title and content
  var body = req.body;
  var data = {
    user_id: body.user.id,
    title: body.title,
    content: body.content,
    location: body.location,
    score: 0
  };
  if (body.lat && body.lng) {
    data.lat = body.lat;
    data.lng = body.lng;
  }

  db.user.createIfNotExist(body.user)
    .then(function() {
      return db.post.create(data);
    })
    .then(function(p) {
      var post = p.toJSON();
      res.json({ id: post.id });
    })
    .catch(logErrAndSend(res, '儲存提問出錯'));
}

function logErrAndSend(res, msg) {
  return function(err) {
    if (err.stack) {
      console.log(err.stack);
    } else {
      console.log(err);
    }
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
