var config = require('../config');
var m = {};
m.knex = require('knex')(config.db);
m.bookshelf = require('bookshelf')(m.knex);

m.User = m.bookshelf.Model.extend({ 
  tableName: 'users',
  hasTimestamps: ['created_at']
});

m.Users = m.bookshelf.Collection.extend({ model: m.User });

m.Post = m.bookshelf.Model.extend({ 
  tableName: 'posts', 
  hasTimestamps: ['created_at', 'updated_at'] ,
  
  owner: function() {
    return this.belongsTo(m.User);
  },

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

  owner: function() {
    return this.belongsTo(m.User);
  },
  post: function() {
    return this.belongsTo(m.Post);
  },
  answer: function() {
    return this.belongsTo(m.Answer);
  }
});

m.Comments = m.bookshelf.Collection.extend({ model: m.Comment });

m.Answer = m.bookshelf.Model.extend({ 
  tableName: 'answers', 
  hasTimestamps: ['created_at', 'updated_at'] ,

  owner: function() {
    return this.belongsTo(m.User);
  },
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
    return this.belongsTo(m.Post);
  },
  answer: function() {
    return this.belongsTo(m.Answer);
  }
});

m.Scores = m.bookshelf.Collection.extend({ model: m.Score });

module.exports = m;
