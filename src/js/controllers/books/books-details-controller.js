'use strict';

angular.module('app').controller('BooksDetailsController', function ($scope, $writer, $state, book) {

  $scope.book = book;

});
