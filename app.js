// When the app starts
var express = require('express');
var app = express();
var db = require('./database');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('views', './templates');
app.set('view engine', 'jade');

// body-parser middleware
app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('./public'));

app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(cookieParser());

app.route('/')
  .get(function(req, res) {
    db.post.getAll()
      .then(function(posts) {
        res.render('views/index', { posts: posts.toJSON() });
      })
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
        res.render('views/post', { post: post.toJSON() });
      });
  });

app.route('/post/new')
  .post(function(req, res) {
    // check req.body.title and content
    var body = req.body;
    var data = {
      user_id: 'yangchuck@gmail.com',
      title: body.title,
      content: body.content,
      location: body.location,
      score: 0
    };

    db.post.create(data)
      .then(function(p) {
        var post = p.toJSON();
        // if successfully saved, redirect to that post
        res.redirect('/post/'+post.id);
      })
      .catch(function(err) {
        console.error(err);
        res.redirect('/');
      });
  });

app.route('/api')
  .post(function(req, res) {
    res.send('success');
  });

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
