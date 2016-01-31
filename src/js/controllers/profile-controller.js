'use strict';

angular.module('app').controller('ProfileController', function ($scope, $state, user) {

  $scope.profile = user.data;

});
