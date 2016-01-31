'use strict';

angular.module('app').controller('BooksSectionsCreateController', function ($scope, $writer, $state, book) {

  $scope.book = book;
  $scope.section = book.createSection();

  $scope.submit = function (form) {
    if (form.$invalid) return;

    $scope.section.create().then(function (resp) {
      $state.go('sections-details', {
        sectionId: resp.id,
        bookId: resp.bookId
      });
    });
  }
});
