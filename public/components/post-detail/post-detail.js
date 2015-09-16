(function() {
'use strict';

angular
  .module('app.postDetail', [])
  .controller('PostDetailController', ['$timeout', '$stateParams', 'globalState', 'mapMarkerStore', 'postDetailStore', PostDetailController]);

function PostDetailController($timeout, $stateParams, globalState, mapMarkerStore, postDetailStore) {
  var self = this;
  this.post = null;

  this.commentFormVisible = {};
  
  function populatePost(post) {
    self.post = post;

    globalState.showRightPane(true)
      .then(function() {
        mapMarkerStore.bounceMarker(self.postId);
        mapMarkerStore.centerOnMarker(self.postId);
      });
  }

  if ($stateParams.id) {
    this.postId = parseInt($stateParams.id);
    postDetailStore.get(this.postId)
      .then(populatePost);
  }
}

})();
