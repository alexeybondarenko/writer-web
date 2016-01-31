'use strict';

angular.module('app').controller('UserController', function ($scope, $state, profile, books) {

  $scope.user = profile;
  $scope.books = books;

  $scope.follow = function () {
    $scope.user.follow();
  };
  $scope.unfollow = function () {
    $scope.user.unfollow();
  };
});
