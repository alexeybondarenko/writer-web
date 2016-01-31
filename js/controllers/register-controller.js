'use strict';

angular.module('app').controller('RegisterController', function ($scope, $state, $writer) {

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
      successUrl: $state.href('register-success', {}, {absolute: true}),
      failureUrl: $state.href('register-failure', {}, {absolute: true})
    }).then(function (resp) {
      $scope.resp = resp;
      $state.go('register-confirm');
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }

});
