(function() {
'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ngNewRouter',
    'ui.bootstrap',
    'angularMoment',
    'app.postList',
    'app.postDetail',
    'app.googleMap'
  ])
  .controller('AppController', ['$router', AppController])
  .run(function(amMoment) {
    // setup moment locale support
    amMoment.changeLocale('zh-tw');
  });

function AppController($router) {
  $router.config([
    { 
      path: '/', 
      components: {
        left: 'postList',
        map: 'googleMap',
        right: 'postDetail'
      }
    }
  ]);
}

})();
