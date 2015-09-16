(function() {
'use strict';

angular.module('app.postList') 
  .service('postListStore', ['$http', PostListStoreService]);

function PostListStoreService($http) {
  var posts = [];
  var fetching = false;
  var callbacks = [];

  this.get = function() {
    if (posts.length) return Promise.resolve(posts);
    if (fetching) {
      var p = new Promise(function(resolve, reject) {
        callbacks.push(resolve);
      });
      return p;
    }

    fetching = true;
    return $http.get('/posts')
      .then(function(res) {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          posts = res.data;
          // call all callbacks
          for (var i = 0; i < callbacks.length; ++i) {
            callbacks[i](posts);
          }

          return Promise.resolve(posts);
        }
      }, function(res) {
        // if any err occurred
      });
  }
}

})();
