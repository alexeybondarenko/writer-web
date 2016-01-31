'use strict';

angular.module('app').controller('BooksSectionsEditController', function ($scope, $writer, $state, book, section) {

  $scope.book = book;
  $scope.section = section;

});
