(function() {
'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'angularMoment',
    'app.postList',
    'app.postDetail',
    'app.postNew',
    'app.googleMap',
    'app.globalStateService'
  ])
  .controller('AppController', ['globalState', 'postDetailStore', AppController])
  .run(function(amMoment) {
    // setup moment locale support
    amMoment.changeLocale('zh-tw');
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        views: {
          header: {
            templateUrl: '/header.html',
          },
          left: {
            templateUrl: '/components/post-list/post-list.html',
          },
          map: {
            templateUrl: '/components/google-map/google-map.html',
          }
        }
      })
    
      .state('app.postNew', {
        url: 'post/new',
        views: {
          'right@': {
            templateUrl: '/components/post-new/post-new.html',
          }
        }
      })

      .state('app.postDetail', {
        url: 'post/:id',
        views: {
          'right@': {
            templateUrl: '/components/post-detail/post-detail.html',
          }
        }
      })
  });

function AppController(globalState, postDetailStore) {
  var self = this;
  this.globalState = globalState;
}

})();
