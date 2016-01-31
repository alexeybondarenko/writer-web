'use strict';

angular.module('app').controller('ProfileController', function ($scope, $state, user) {

  $scope.user = user;

  $scope.follow = function () {
    user.follow();
  };
  $scope.unfollow = function () {
    user.unfollow();
  };
});
