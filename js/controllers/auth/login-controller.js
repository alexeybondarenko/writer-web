'use strict';

angular.module('app').controller('LoginController', function ($scope, $state, AuthService) {

  $scope.model = {
    email: null,
    password: null
  };

  $scope.error = null;
  $scope.submit = function (form) {
    if (form.$invalid) {return;}

    AuthService.login($scope.model.email, $scope.model.password).then(function (resp) {
      $state.go('library');
    }, function (resp) {
      $scope.error = resp;
    })
  }

});
