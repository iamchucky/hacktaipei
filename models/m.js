var config = require('../config');
var m = {};
m.knex = require('knex')(config.db);
m.bookshelf = require('bookshelf')(m.knex);

m.Post = m.bookshelf.Model.extend({ 
  tableName: 'posts', 
  hasTimestamps: ['created_at', 'updated_at'] ,

  comments: function() {
    return this.hasMany(m.Comment);
  },
  
  answers: function() {
    return this.hasMany(m.Answer);
  }
});

m.Posts = m.bookshelf.Collection.extend({ model: m.Post });

m.Comment = m.bookshelf.Model.extend({ 
  tableName: 'comments', 
  hasTimestamps: ['created_at', 'updated_at'] 
});

m.Comments = m.bookshelf.Collection.extend({ model: m.Comment });

m.Answer = m.bookshelf.Model.extend({ 
  tableName: 'answers', 
  hasTimestamps: ['created_at', 'updated_at'] ,

  comments: function() {
    return this.hasMany(m.Comment);
  }
});

m.Answers = m.bookshelf.Collection.extend({ model: m.Answer });

module.exports = m;
