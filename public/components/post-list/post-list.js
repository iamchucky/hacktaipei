(function() {
'use strict';

angular.module('app.postList', []) 
  .controller('PostListController', ['postListStore', PostListController]);

function PostListController(postListStore) {
  var self = this;
  this.posts = [];

  postListStore.get()
    .then(function(posts) {
      self.posts = posts;
    });
}

})();
