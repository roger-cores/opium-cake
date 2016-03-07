var app = angular.module('opium', ['ngMaterial']);
app.config(function($mdThemingProvider){
   $mdThemingProvider.theme('default')
       .primaryPalette('red',{
     'default':'900',
     'hue-1':'800'
   })
    .accentPalette('teal')
   .warnPalette('red');
});
app.controller('LoginCtrl', function($scope) {
  $scope.errorMessage="Cannot log you in sorry!";
  $scope.login = function(){

  }

});
