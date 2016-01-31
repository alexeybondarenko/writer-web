'use strict';

angular.module('app').controller('UserController', function ($scope, $state, profile) {

  $scope.user = profile;

  $scope.follow = function () {
    $scope.user.follow();
  };
  $scope.unfollow = function () {
    $scope.user.unfollow();
  };
});
