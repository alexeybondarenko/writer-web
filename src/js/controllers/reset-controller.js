'use strict';

angular.module('app').controller('ResetController', function ($scope, $writer, $state) {

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
      successUrl: $state.href('reset-confirm', {}, {absolute: true}),
      failureUrl: $state.href('reset-failure', {}, {absolute: true})
    }).then(function (resp) {
      $scope.resp = resp;
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }
});
