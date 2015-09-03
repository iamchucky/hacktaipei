$(function() {

  var map;

  function initialize() {
    map = new google.maps.Map(document.getElementById('inpost-map-canvas'), {
      zoom: 12,
      center: { lat: 25.08, lng: 121.55 },
      disableDefaultUI: true
    });
  }
  
  google.maps.event.addDomListener(window, 'load', initialize);

});
