'use strict';

angular.module('app').controller('BooksEditController', function ($scope, $writer, $state, book) {

  $scope.book = book;
  $scope.submit = function (form) {
    if (form.$invalid) return;

    $scope.book.save().then(function (resp) {
      $state.go('books-details', {
        bookId: $scope.book.id
      });
    })
  }

});
