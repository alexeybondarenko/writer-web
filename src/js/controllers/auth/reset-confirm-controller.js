'use strict';

angular.module('app').controller('ResetConfirmController', function ($scope, $writer, $state, URL) {

  var access_token = URL.token;
  if (!access_token) {
    return $state.go('reset');
  }

  $scope.model = {
    email: null,
    password: null
  };

  $scope.resp = null;
  $scope.isError = null;

  $scope.submit = function (form) {
    if (form.$invalid) {return;}

    $scope.resp = null;
    $scope.isError = null;

    $writer.resetConfirm($scope.model.email, access_token, $scope.model.password)
    .then(function (resp) {
      $scope.resp = resp;
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }
});
