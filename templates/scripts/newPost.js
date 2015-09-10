$(function() {

  var map, marker;

  window.initMap = function() {
    var mapCanvas = $('#map-canvas');

    if (mapCanvas[0]) {
      map = new google.maps.Map(mapCanvas[0], {
        zoom: 12,
        center: { lat: 25.08, lng: 121.55 },
        disableDefaultUI: true
      });
    }

    function setLatLng(latLng) {
      if (latLng) {
        $('#latlng').text(latLng);
        $('#lat').val(latLng.lat());
        $('#lng').val(latLng.lng());
      } else {
        $('#latlng').text('');
        $('#lat').val(null);
        $('#lng').val(null);
      }
    }

    map.addListener('click', function(e) {
      if (!marker) {
        marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: e.latLng
        });
        marker.addListener('drag', function(e) {
          setLatLng(e.latLng);
        });
        marker.addListener('dblclick', function(e) {
          setLatLng();
          marker.setMap(null);
          marker = null;
        });
        setLatLng(e.latLng);
      }
    });
  }


  $('#post-submit').click(function(e) {
    var invalidReason = '';

    var title = $('#post-title').val().trim();
    var content = $('#post-content').val().trim();
    var location = $('#post-location').val().trim();
    invalidReason = checkPost(title, content, location);

    if (invalidReason) {
      e.preventDefault();
      $('#err-text').text(invalidReason);
    }
  });

  function checkPost(title, content, location) {
    if (!title) return '請輸入標題';
    if (!content) return '請輸入內容';
  }
});

