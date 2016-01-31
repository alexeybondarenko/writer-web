'use strict';

angular.module('app').config(function ($stateProvider) {

  $stateProvider.state('books-sections', {
    parent: 'books-details',
    url: 'sections',
    abstract: true
  }).state('sections-create', {
    parent: 'books-sections',
    url: '/create',
    views: {
      'content@': {
        templateUrl: './templates/books/sections/sections-create.html',
        controller: 'BooksSectionsCreateController'
      }
    },
    ncyBreadcrumb: {
      label: 'Create new section'
    }
  });

  $stateProvider.state('sections-id', {
    abstract: true,
    parent: 'books-sections',
    url: '/:sectionId',
    resolve: {
      section: function (Book, $stateParams) {
        return Book.byId($stateParams.bookId).getSection($stateParams.sectionId);
      }
    }
  }).state('sections-details', {
    parent: 'sections-id',
    url: '/',
    views: {
      'content@': {
        templateUrl: './templates/books/sections/sections-details.html',
        controller: 'BooksSectionsDetailsController'
      }
    },
    ncyBreadcrumb: {
      label: '{{section.name}}'
    }
  }).state('sections-edit', {
    parent: 'sections-details',
    url: '/edit',
    views: {
      'content@': {
        templateUrl: './templates/books/sections/sections-edit.html',
        controller: 'BooksSectionsEditController'
      }
    },
    ncyBreadcrumb: {
      label: 'edit'
    }
  });

});
