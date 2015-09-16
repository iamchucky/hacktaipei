(function() {
'use strict';

angular
  .module('app.postNew', [])
  .controller('PostNewController', ['$timeout', 'globalState', 'mapMarkerStore', PostNewController]);

function PostNewController($timeout, globalState, mapMarkerStore) {
  globalState.showRightPane(true)
    .then(function() {
      mapMarkerStore.bounceMarker();
    });
}

})();
