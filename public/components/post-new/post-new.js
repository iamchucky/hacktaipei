(function() {
'use strict';

angular
  .module('app.postNew', [])
  .controller('PostNewController', ['$scope', '$timeout', '$http', '$state', 'globalState', 'mapMarkerStore', PostNewController]);

function PostNewController($scope, $timeout, $http, $state, globalState, mapMarkerStore) {
  var self = this;
  this.marker = null;

  // show the right pane if we are showing the new post view
  globalState.showRightPane(true)
    .then(function() {
      mapMarkerStore.bounceMarker();
    });

  this.latLng = '';
  this.data = {
    title: '',
    content: '',
    location: '',
    lat: '',
    lng: ''
  };

  function setLatLng(latLng) {
    if (latLng) {
      $scope.$evalAsync(function() {
        self.latLng = latLng.toString();
      });
      self.data.lat = latLng.lat().toString();
      self.data.lng = latLng.lng().toString();
    }
  }

  this.dropMarker = function() {
    if (!self.marker) {
      var pos = map.getCenter();
      self.marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos
      });
      self.marker.addListener('drag', function(e) {
        setLatLng(e.latLng);
      });
      setLatLng(pos);
    } else {
      map.panTo(self.marker.getPosition());
    }
  };

  this.errMsg = '';
  this.formSubmitted = false;
  this.submitForm = function(isValid) {
    self.formSubmitted = true;
    if (!isValid) { 
      self.errMsg = '請輸入必填欄位';
      return; 
    }

    $http.post('/post/new', self.data)
      .then(function(res) {
        if (res.data.error) {
          self.errMsg = res.data.msg;
          return console.log(res.data.error);
        }

        if (self.marker) {
          self.marker.setMap(null);
          self.marker = null;
        }

        // reload list and marker then change state
        globalState.update();
        $state.go('app.postDetail', { id: res.data.id });
      }, function(res) {
        console.log(res);
      });
  };

}

})();
