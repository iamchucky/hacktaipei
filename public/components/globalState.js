(function() {
'use strict';

angular
  .module('app.globalStateService', [])
  .service('globalState', ['$timeout', GlobalStateService]);

function GlobalStateService($timeout) {
  var self = this;
  this.rightPaneIsShown = false;
  this.showRightPane = function(show) {
    if (self.rightPaneIsShown == show) return Promise.resolve();

    this.rightPaneIsShown = show;

    var res;
    var p = new Promise(function(resolve, reject) {
      res = resolve;
    });
    $timeout(function() {
      google.maps.event.trigger(map, 'resize');
      res();
    }, 300);

    return p;
  };
}

})();