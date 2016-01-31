'use strict';

angular.module('app').controller('LibraryController', function ($scope, $writer, $state, user) {

  $scope.user = user.data;
});
