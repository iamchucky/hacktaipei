(function() {
'use strict';

angular
  .module('app.googleMap', [])
  .controller('GoogleMapController', ['postListStore', 'mapMarkerStore', GoogleMapController]);

function GoogleMapController(postListStore, mapMarkerStore) {
  var self = this;
  this.posts = [];

  this.initGoogleMap = function() {
    postListStore.get()
      .then(function(posts) {
        self.posts = posts;
        // show markers

        for (var i = 0; i < posts.length; ++i) {
          if (!posts[i].lat) continue;

          mapMarkerStore.markers[posts[i].id] = new google.maps.Marker({
            map: map,
            position: { lat: parseFloat(posts[i].lat), lng: parseFloat(posts[i].lng) }
          });
        }
      });
  };

  if (googleSDKLoaded) {
    this.initGoogleMap();
  } else {
    initMapCallbacks.push(this.initGoogleMap);
  }

}

})();
