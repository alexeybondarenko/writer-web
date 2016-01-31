'use strict';

angular.module('app').controller('LoginController', function ($scope, $writer) {

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

    $writer.login($scope.model.email, $scope.model.password).then(function (resp) {
      $scope.resp = resp;
    }, function (resp) {
      $scope.resp = resp;
      $scope.isError = true;
    })
  }

});
