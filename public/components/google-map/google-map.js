(function() {
'use strict';

angular
  .module('app.googleMap', [])
  .controller('GoogleMapController', ['globalState', 'mapMarkerStore', GoogleMapController]);

function GoogleMapController(globalState, mapMarkerStore) {

  if (googleSDKLoaded) {
    mapMarkerStore.initGoogleMap();
  } else {
    initMapCallbacks.push(mapMarkerStore.initGoogleMap);
  }

}

})();
