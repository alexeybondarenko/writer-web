'use strict';

angular.module('app').controller('UserController', function ($scope, $state, user) {

  $scope.user = user;

  $scope.follow = function () {
    user.follow();
  };
  $scope.unfollow = function () {
    user.unfollow();
  };
});
