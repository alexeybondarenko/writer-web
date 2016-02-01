'use strict';

angular.module('app').controller('BooksController', function ($scope, $writer, $state, books) {

  console.log('BooksController', books);
  $scope.books = books;

});
