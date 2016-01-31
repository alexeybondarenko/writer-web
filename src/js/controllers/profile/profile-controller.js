'use strict';

angular.module('app').controller('ProfileController', function ($scope, $state, user, books) {

  $scope.user = user;
  $scope.books = books;

  $scope.follow = function () {
    $scope.user.follow();
  };
  $scope.unfollow = function () {
    $scope.user.unfollow();
  };
});
