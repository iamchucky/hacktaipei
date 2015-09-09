$(function() {

  var map;

  function initialize() {
    var mapCanvas = $('#inpost-map-canvas');

    if (mapCanvas[0]) {
      map = new google.maps.Map(mapCanvas[0], {
        zoom: 12,
        center: { lat: 25.08, lng: 121.55 },
        disableDefaultUI: true
      });
    }
  }
  
  google.maps.event.addDomListener(window, 'load', initialize);

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

});
