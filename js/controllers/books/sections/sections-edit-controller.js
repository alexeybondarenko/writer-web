'use strict';

angular.module('app').controller('BooksSectionsEditController', function ($scope, $writer, $state, book, section, BookSection) {

  $scope.book = book;
  $scope.section = new BookSection(book.id, angular.copy(section));

  $scope.cancel = function () {
    $state.go('sections-details', {
      bookId: $scope.section.book.id,
      sectionId: $scope.section.id
    });
  };

  $scope.submit = function (form) {
    if (form.$invalid) return;

    $scope.section.save().then(function () {
      $state.go('sections-details', {
        bookId: $scope.section.book.id,
        sectionId: $scope.section.id
      }, {
        reload: true
      })
    });
  };

  $scope.delete = function () {
    if (!confirm('Are you sure?')) return;

    $scope.section.delete().then(function () {
      $state.go('books-details', {
        bookId: $scope.book.id
      }, {
        reload: true
      });
    });
  }
});
