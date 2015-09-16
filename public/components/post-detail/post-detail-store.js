(function() {
'use strict';

angular
  .module('app.postDetail')
  .service('postDetailStore', ['$http', PostDetailStoreService]);

function PostDetailStoreService($http) {
  this.get = function(postId) {
    return $http.get('/post/'+postId)
      .then(function(res) {
        return Promise.resolve(res.data);
      }, function(res) {
        // if failed
      });
  };
}

})();
