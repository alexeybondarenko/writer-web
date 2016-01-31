'use strict';

angular.module('app').controller('BooksCreateController', function ($scope, $writer, $state, Book) {

  $scope.book = new Book();
  $scope.submit = function (form) {
    if (form.$invalid) return;

    $scope.book.create().then(function (resp) {
      $state.go('books-details', {
        bookId: resp.id
      });
    })
  }
});
