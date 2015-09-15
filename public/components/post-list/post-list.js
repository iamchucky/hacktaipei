(function() {
'use strict';

var postList = angular.module('app.postList', []);

postList.controller('PostListController', ['$http', PostListController]);

function PostListController($http) {
  var self = this;
  this.posts = [{
    title: '測試標題',
    content: '有沒有測試',
    user_id: 'yangchuck@gmail.com',
    created_at: new Date()
  }];

  $http.get('/posts')
    .then(function(res) {
      if (res.data.error) {
        return console.log(res.data.error);
      }
      self.posts = res.data;
    }, function(res) {
      // if any err occurred
    });
}

})();
