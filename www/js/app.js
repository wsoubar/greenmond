// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $http.get('./personagens.json')
     .success(function(data) {
        console.log('data', data);
        $rootScope.personagens = data;
     })
     .error(function(err) {
          console.log('erro buscando personagens', err);
     }); 



  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })



  .state('app.cidade', {
    url: "/cidade",
    views: {
      'menuContent': {
        templateUrl: "templates/cidade.html"
      }
    }
  })

  .state('app.feeds', {
    url: "/feeds",
    views: {
      'menuContent': {
        templateUrl: "templates/feeds.html",
        controller: "FeedsCtrl"
      }
    }
  })

  .state('app.npcs', {
    url: "/npcs",
    views: {
      'menuContent': {
        templateUrl: "templates/npcs.html",
        controller: 'NpcsCtrl'
      }
    }
  })

  .state('app.personagens', {
    url: "/personagens",
    views: {
      'menuContent': {
        templateUrl: "templates/personagens.html",
        controller: 'PersonagensCtrl'
      }
    }
  })

  .state('app.personagem', {
    url: "/personagem/:personagemId",
    params: {
        personagem: {}
    },
    views: {
      'menuContent': {
        templateUrl: "templates/personagem.html",
        controller: 'PersonagemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/feeds');
});
