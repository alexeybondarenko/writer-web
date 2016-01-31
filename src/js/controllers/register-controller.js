'use strict';

angular.module('app').controller('RegisterController', function ($scope, $state, $writer, utils) {

  $scope.model = {
    email: null,
    password: null
  };

  $scope.resp = null;
  $scope.isError = false;
  $scope.submit = function (form) {
    if (form.$invalid) {return;}

    $scope.resp = null;
    $scope.isError = false;

    $writer.register($scope.model.email, $scope.model.password, {
      successUrl: utils.href('register-success', {}),
      failureUrl: utils.href('register-failure', {})
    }).then(function (resp) {
      $scope.resp = resp;
      $state.go('register-confirm');
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }

});
