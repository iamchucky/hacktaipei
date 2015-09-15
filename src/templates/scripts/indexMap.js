var map;

window.initMap = function() {
  var mapCanvas = document.getElementById('map-canvas');

  if (mapCanvas) {
    map = new google.maps.Map(mapCanvas, {
      zoom: 12,
      center: { lat: 25.08, lng: 121.55 },
      disableDefaultUI: true,
      streetViewControl: true
    });
  }
};

