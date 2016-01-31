'use strict';

angular.module('app').controller('BooksSectionsDetailsController', function ($scope, $writer, $state, book, section) {

  $scope.book = book;
  $scope.section = section;

});
