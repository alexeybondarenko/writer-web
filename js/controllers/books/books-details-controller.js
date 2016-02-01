'use strict';

angular.module('app').controller('BooksDetailsController', function ($scope, $writer, $state, book) {

  $scope.book = book;

  $scope.delete = function () {

    if (!confirm('Are you sure?')) return;

    $scope.book.delete().then(function () {
      $state.go('books');
    })
  }

});
