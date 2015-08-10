angular.module('nashviva.controllers', [])

//for device (this is the actual code for use on phones)
.controller('facebookLoginCtrl', function($scope, $cordovaOauth, $state, Auth) {

  $scope.login = function() {
    $cordovaOauth.facebook("526183770866828", ["email"]).then(function(result) {
      Auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
        console.log(JSON.stringify(authData));
        // redirect to secure area
        $state.go("tab.map");
      }, function(error) {
        console.error("ERROR: " + error);
      });
    }, function(error) {
      console.log("ERROR: " + error);
    });
  }
})


// // //for debugging in browser (comment out above and uncomment this to debug in browser)
// .controller("facebookLoginCtrl", function($scope, $firebaseAuth, $state, Auth) {
//   var ref = new Firebase("https://nashviva.firebaseio.com/");

//   $scope.login = function () {
//     ref.authWithOAuthPopup("facebook", function(error, authData) {
//       if (error) {
//         $ionicPopup.alert({
//             title: 'Error',
//             template: 'Try logging in again. Error: ' + error
//         });
//       } else {
//         console.log("Authenticated successfully with payload:", authData);
//         $state.go("tab.map");
//       }
//     });
//   }
// })

.controller('MapCtrl', function($scope, $state, Auth) {
  $scope.logout = function() {
    Auth.$unauth();
    $state.go("login");
  }
})

.controller('ProfileCtrl', function($scope) {})
