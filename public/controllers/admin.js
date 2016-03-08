var app = angular.module('opium-admin', ['ngMaterial']);


app.controller('UsersCtrl', ['$scope', '$http', '$mdDialog', '$mdMedia', function($scope, $http, $mdDialog, $mdMedia) {
    console.log('hell');
    var refresh = function(){
      $http.get('/api/admin/user').success(function(response){
        $scope.users = response;
        console.log(response);
      });
    }

    refresh();


    var deleteUser = function(id) {
      $http.put('/api/admin/user/deactivate/'+id).success(function(response){
        refresh();
      });

    }

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
            .title('Would you like to deactivate this user?')
            .textContent('Once deactivated, this user will not be able to use OpiumCake till you activate them again')
            .ariaLabel('Deactivate User')
            .targetEvent(ev)
            .ok('Aye!')
            .cancel('Belay that!');
      $mdDialog.show(confirm).then(function() {
        deleteUser(id);
      }, function() {
      });
    };

    $scope.showAdvanced = function(ev, id) {
      var useFullScreen = ($mdMedia('xs'));
      $scope.user_id = id;
      $mdDialog.show({
        controller: EditDialogController,
        templateUrl: 'admin-users-edit-user',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        scope: $scope,
        preserveScope: true
      })
      .then(function(answer) {
        if(answer == 'yes'){
          //save
        }
      }, function() {

      });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    function EditDialogController($scope, $mdDialog, $http) {

      var refresh = function(){
        $http.get('/api/admin/user/'+$scope.user_id).success(function(response){
          $scope.user = response;
        });
      }

      refresh();

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {

        $mdDialog.hide(answer);

      };
    }

}]);



app.controller('AdminCtrl', function($scope, $timeout, $mdSidenav, $log) {
    console.log('hell no');
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.url = 'admin-users';
    $scope.usersclass = 'selected';
    $scope.projectsclass = '';

    var selectMenuItem = function(url){
      switch(url){
        case 'admin-users':
          $scope.usersclass = 'selected';
          $scope.projectsclass = '';
          $scope.m1 = '';
          $scope.m2 = '';
          break;
        case 'admin-projects':
          $scope.usersclass = '';
          $scope.projectsclass = 'selected';
          $scope.m1 = '';
          $scope.m2 = '';
          break;
        case 'm1':
          $scope.usersclass = '';
          $scope.projectsclass = '';
          $scope.m1 = 'selected';
          $scope.m2 = '';
          return;
        case 'm2':
          $scope.usersclass = '';
          $scope.projectsclass = '';
          $scope.m1 = '';
          $scope.m2 = 'selected';

          return;

      }

      $scope.url = url;
    }

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.toggleModule = function(url){
      selectMenuItem(url);
      $scope.toggleLeft();
    }

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

});
