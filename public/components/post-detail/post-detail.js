(function() {
'use strict';

angular
  .module('app.postDetail', [])
  .controller('PostDetailController', ['$timeout', '$stateParams', '$state', '$http', 'globalState', 'mapMarkerStore', 'postDetailStore', PostDetailController]);

function PostDetailController($timeout, $stateParams, $state, $http, globalState, mapMarkerStore, postDetailStore) {
  var self = this;
  this.post = null;
  this.postId = null;

  this.commentFormVisible = {};
  this.comments = {};
  this.answerInput = '';

  this.submitCommentForm = function(type, id, comment) {
    if (comment.trim() == '') return;

    var data = {
      type: 'comment-'+type,
      content: comment
    };

    if (type == 'ans') {
      data.answerId = id;
    }

    self.submitForm(data);
  };

  this.submitAnswerForm = function() {
    if (self.answerInput.trim() == '') return;

    var data = {
      type: 'answer',
      content: self.answerInput
    }

    self.submitForm(data);
  };

  this.submitForm = function(data) {
    $http.post('/post/'+self.postId, data)
      .then(function(res) {
        if (res.data.error) {
          return console.log(res.data.error);
        }

        $state.go('app.postDetail', null, { reload: 'app.postDetail' });
      }, function(res) {
        console.log(res);
      });
  };
  
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
