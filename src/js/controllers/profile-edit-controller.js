'use strict';

angular.module('app').controller('ProfileEditController', function ($scope, $state, $log, user) {

  $scope.user = user;

  $scope.submit = function (form) {
    if (form.$invalid) return;

    $scope.user.save().then(function () {
      $log.debug('profile update');
      $state.go('profile');
    }, function () {
      $log.debug('profile error');
    })
  }

});
