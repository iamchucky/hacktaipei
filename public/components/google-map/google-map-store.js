(function() {
'use strict';

angular.module('app.googleMap') 
  .service('mapMarkerStore', [MapMarkerStoreService]);

function MapMarkerStoreService() {
  this.markers = {};

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
