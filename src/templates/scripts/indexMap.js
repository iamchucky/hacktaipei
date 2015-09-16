var map;

var googleSDKLoaded = false;
var initMapCallbacks = [];

window.initMap = function() {
  var mapCanvas = document.getElementById('map-canvas');

  if (mapCanvas) {
    map = new google.maps.Map(mapCanvas, {
      zoom: 12,
      center: { lat: 25.08, lng: 121.55 },
      disableDefaultUI: true,
      streetViewControl: true
    });

    // google sdk is ready, so call initMapCallbacks
    for (var i = 0; i < initMapCallbacks.length; ++i) {
      initMapCallbacks[i]();
    }
    googleSDKLoaded = true;
  } else {
    setTimeout(initMap, 200);
  }
};

