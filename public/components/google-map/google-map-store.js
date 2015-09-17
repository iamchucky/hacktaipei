(function() {
'use strict';

angular.module('app.googleMap') 
  .service('mapMarkerStore', ['postListStore', MapMarkerStoreService]);

function MapMarkerStoreService(postListStore) {
  var self = this;
  this.markers = {};

  this.clearMarkers = function() {
    for (var pid in self.markers) {
      var m = self.markers[pid]
      m.setMap(null);
    }
    self.markers = {};
  };

  this.initGoogleMap = function() {
    postListStore.get()
      .then(function(posts) {
        self.clearMarkers();

        // show markers
        for (var i = 0; i < posts.length; ++i) {
          if (!posts[i].lat) continue;

          self.markers[posts[i].id] = new google.maps.Marker({
            map: map,
            position: { lat: parseFloat(posts[i].lat), lng: parseFloat(posts[i].lng) }
          });
        }
      });
  };

  this.bounceMarker = function(idToBounce) {
    for (var id in this.markers) {
      var ani = null;
      if (id == idToBounce) {
        ani = google.maps.Animation.BOUNCE;
      }
      this.markers[id].setAnimation(ani);
    }
  };

  this.centerOnMarker = function(idToCenter) {
    if (!this.markers[idToCenter]) return;
    map.panTo(this.markers[idToCenter].getPosition());
  };

  this.fitBoundOnMarker = function(idToFitBound) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.markers[idToFitBound].getPosition());
    map.fitBounds(bounds);
  };
}

})();
