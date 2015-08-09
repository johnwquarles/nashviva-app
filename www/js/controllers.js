angular.module('nashviva.controllers', [])

//for device (this is the actual code)
.controller('facebookLoginCtrl', function($scope, $cordovaOauth, $state, Auth) {

  // send back to secured area if user somehow gets to login screen while logged in.
  if (Auth.$getAuth()) {$state.go("secure")}

  $scope.login = function() {
    $cordovaOauth.facebook("526183770866828", ["email"]).then(function(result) {
      Auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
        console.log(JSON.stringify(authData));
        // redirect to secure area
        $state.go("secure");
      }, function(error) {
        console.error("ERROR: " + error);
      });
    }, function(error) {
      console.log("ERROR: " + error);
    });
  }
})


// // //for debugging in browser
// .controller("facebookLoginCtrl", function($scope, $firebaseAuth, $state, Auth) {
//   var ref = new Firebase("https://nashviva.firebaseio.com/");

//   if (Auth.$getAuth()) {$state.go("secure")}

//   $scope.login = function () {
//     ref.authWithOAuthPopup("facebook", function(error, authData) {
//       if (error) {
//         $ionicPopup.alert({
//             title: 'Error',
//             template: 'Try logging in again. Error: ' + error
//         });
//       } else {
//         console.log("Authenticated successfully with payload:", authData);
//         // *A like below: using Auth instead of $firebaseAuth(ref).$getAUth
//         console.log(Auth.$getAuth());
//         $state.go("secure");
//       }
//     });
//   }
// })

.controller('secureCtrl', function($scope, $state, Auth) {
  $scope.logout = function() {
    Auth.$unauth();
    $state.go("login");
  }
})
