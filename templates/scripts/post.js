$(function() {

  var map;

  window.initMap = function() {
    var mapCanvas = $('#inpost-map-canvas');

    if (mapCanvas[0]) {
      var lat = parseFloat(mapCanvas.attr('lat'));
      var lng = parseFloat(mapCanvas.attr('lng'));
      var pos = { lat: lat, lng: lng };
      map = new google.maps.Map(mapCanvas[0], {
        zoom: 15,
        center: pos,
        disableDefaultUI: true,
        streetViewControl: true
      });
      var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: pos
      });
    }
  }
  
  window.showCommentForm = function(elem) {
    if (!elem.nextSibling) return;

    elem.style.display = 'none';
    elem.nextSibling.style.display = 'block';
  };

  window.submitForm = function(elem) {
    if (elem.parentNode.parentNode.nodeName !== 'FORM') return;
    if (elem.previousSibling.nodeName !== 'TEXTAREA') return;

    var form = elem.parentNode.parentNode;
    var commentContent = elem.previousSibling;
    if (!commentContent.value.trim()) return;
    $(form).submit();
  };

  window.castVote = function(elem, updown) {
    if (elem.parentNode.parentNode.className !== 'score-container') return;
    if (elem.parentNode.parentNode.firstChild.nodeName !== 'FORM') return;

    var form = elem.parentNode.parentNode.firstChild;
    form.updown.value = updown;
    $(form).submit();
  }

});
