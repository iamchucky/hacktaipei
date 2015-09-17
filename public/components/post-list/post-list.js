(function() {
'use strict';

angular.module('app.postList', []) 
  .controller('PostListController', ['postListStore', 'mapMarkerStore', 'globalState', PostListController]);

function PostListController(postListStore, mapMarkerStore, globalState) {
  var self = this;
  this.posts = [];

  function getList() {
    postListStore.get()
      .then(function(posts) {
        self.posts = posts;
        mapMarkerStore.initGoogleMap(posts);
      });
  }

  getList();

  globalState.addListener(function() {
    postListStore.flush();
    getList();
  });
}

})();
