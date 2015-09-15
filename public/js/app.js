(function() {
'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ngNewRouter',
    'ui.bootstrap'
  ])
  .controller('AppController', ['$router', AppController]);

function AppController($router) {
  $router.config([
    { 
      path: '/', 
      components: {
        left: 'postList',
        map: 'map',
        right: 'content'
      }
    }
  ]);
}

})();
