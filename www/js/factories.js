angular.module('nashviva.factories', [])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var fb = new Firebase("https://nashviva.firebaseio.com/");
    return $firebaseAuth(fb);
  }
])

.factory("Loading", function($ionicLoading) {
  return {
    show : function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    },
    hide : function(){
      $ionicLoading.hide();
    }
  }
})
