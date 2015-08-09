angular.module('nashviva.factories', [])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://nashviva.firebaseio.com/");
    return $firebaseAuth(ref);
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
