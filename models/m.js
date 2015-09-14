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
  },

  score: function() {
    return this.hasOne(m.Score);
  }
});

m.Posts = m.bookshelf.Collection.extend({ model: m.Post });

m.Comment = m.bookshelf.Model.extend({ 
  tableName: 'comments', 
  hasTimestamps: ['created_at', 'updated_at'],

  post: function() {
    return this.belongTo(m.Post);
  },
  answer: function() {
    return this.belongTo(m.Answer);
  }
});

m.Comments = m.bookshelf.Collection.extend({ model: m.Comment });

m.Answer = m.bookshelf.Model.extend({ 
  tableName: 'answers', 
  hasTimestamps: ['created_at', 'updated_at'] ,

  comments: function() {
    return this.hasMany(m.Comment);
  },

  score: function() {
    return this.hasOne(m.Score);
  }
});

m.Answers = m.bookshelf.Collection.extend({ model: m.Answer });

m.Score = m.bookshelf.Model.extend({ 
  tableName: 'scores',

  post: function() {
    return this.belongTo(m.Post);
  },
  answer: function() {
    return this.belongTo(m.Answer);
  }
});

m.Scores = m.bookshelf.Collection.extend({ model: m.Score });

module.exports = m;
