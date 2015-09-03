// When the app starts
var express = require('express');
var app = express();
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
    res.render('views/index');
  });

app.route('/post')
  .get(function(req, res) {
    res.render('views/post');
  });

app.route('/post/new')
  .get(function(req, res) {
    res.render('views/newPost');
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
