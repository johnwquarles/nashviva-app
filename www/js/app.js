// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('nashviva', ['ionic', 'firebase', 'ngCordova', 'nashviva.factories', 'nashviva.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// catching $stateChangeErrors that arise when user is directed to secure area
// while not logged in; redirects to login page.
.run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "facebookLoginCtrl",
      onEnter: function(Auth, $state) {
        if (Auth.$getAuth()) {$state.go("tab.map");}
      },
      cache: false,
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    // below: resolve is checking for user authentication before sending to the secure area.
    // Auth is a factory returning $firebaseAuth(ref); promise is resolved if authenticated,
    // rejected if not with a $stateChangeError and caught above;
    // see https://www.firebase.com/docs/web/libraries/angular/guide/user-auth.html#section-routers
    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        },
      resolve: {
        "currentAuth": function(Auth) {
          return Auth.$requireAuth();
        }
      }
      }
    })

    .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      });

  // send user to /secure area by default; will stay there if authentication data is present
  // (user is logged in) or will be redirected to login page if not (see above).
  $urlRouterProvider.otherwise('/login');
})
