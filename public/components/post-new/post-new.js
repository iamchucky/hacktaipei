(function() {
'use strict';

angular
  .module('app.postNew', [])
  .controller('PostNewController', ['$timeout', '$http', '$state', 'globalState', 'mapMarkerStore', PostNewController]);

function PostNewController($timeout, $http, $state, globalState, mapMarkerStore) {
  var self = this;

  // show the right pane if we are showing the new post view
  globalState.showRightPane(true)
    .then(function() {
      mapMarkerStore.bounceMarker();
    });

  this.data = {
    title: '',
    content: '',
    location: ''
  };

  this.errMsg = '';
  this.formSubmitted = false;
  this.submitForm = function(isValid) {
    self.formSubmitted = true;
    if (!isValid) { 
      self.errMsg = '請輸入必填欄位';
      return; 
    }

    $http.post('/post/new', self.data)
      .then(function(res) {
        if (res.data.error) {
          self.errMsg = res.data.msg;
          return console.log(res.data.error);
        }

        // reload list and marker then change state
        globalState.update();
        $state.go('app.postDetail', { id: res.data.id });
      }, function(res) {
        console.log(res);
      });
  };

}

})();
