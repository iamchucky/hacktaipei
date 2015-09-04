var config = require('../config');
var knex = require('knex')(config.db);
var bs = require('bookshelf')(knex);

var Post = bs.Model.extend({ 
  tableName: 'posts', 
  hasTimestamps: ['created_at', 'updated_at'] 
});

var Posts = bs.Collection.extend({ model: Post });

module.exports = {
  getAll: function() {
    return Posts.forge().fetch();
  },

  get: function(id) {
    return Post.where({ id: id }).fetch();
  },

  create: function(data) {
    return Post.forge(data).save();
  },

  remove: function(post) {
    return Post.where({ id: post.id }).destroy();
  }
};
