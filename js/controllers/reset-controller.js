'use strict';

angular.module('app').controller('ResetController', function ($scope, $writer, utils) {

  $scope.model = {
    email: null
  };

  $scope.resp = null;
  $scope.isError = false;
  $scope.submit = function (form) {
    if (form.$invalid) {return;}

    $scope.resp = null;
    $scope.isError = false;

    $writer.reset($scope.model.email, {
      successUrl: utils.href('reset-confirm', {}),
      failureUrl: utils.href('reset-failure', {})
    }).then(function (resp) {
      $scope.resp = resp;
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }
});
