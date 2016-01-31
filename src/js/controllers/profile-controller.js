'use strict';

angular.module('app').controller('ProfileController', function ($scope, $state, user) {

  $scope.user = user;

  $scope.follow = function () {
    $scope.user.follow();
  };
  $scope.unfollow = function () {
    $scope.user.unfollow();
  };
});
