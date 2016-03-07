var app = angular.module('opium', ['ngMaterial']);
app.config(function($mdThemingProvider){
   $mdThemingProvider.theme('default')
       .primaryPalette('red',{
     'default':'900',
     'hue-1':'800'
   })
    .accentPalette('teal')
   .warnPalette('red');
}).controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;

  $scope.googleUrl = 'http://google.com';

});
