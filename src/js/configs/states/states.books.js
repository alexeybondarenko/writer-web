'use strict';

angular.module('app').config(function ($stateProvider) {

  $stateProvider.state('books', {
    parent: 'auth',
    url: '/books',
    views: {
      'content@': {
        templateUrl: './templates/books/books.html',
        controller: 'BooksController',
        resolve: {
          books: function (Book) {
            return Book.find();
          }
        }
      }
    },
    ncyBreadcrumb: {
      label: 'Books'
    }
  }).state('books-create', {
    parent: 'books',
    url: '/create',
    views: {
      'content@': {
        templateUrl: './templates/books/books-create.html',
        controller: 'BooksCreateController'
      }
    },
    ncyBreadcrumb: {
      label: 'Create new book'
    }
  });

  $stateProvider.state('books-id', {
    abstract: true,
    parent: 'books',
    url: '/:bookId',
    resolve: {
      book: function (Book, $stateParams) {
        return Book.byId($stateParams.bookId).fetch();
      }
    }
  }).state('books-details', {
    parent: 'books-id',
    url: '/',
    views: {
      'content@': {
        templateUrl: './templates/books/books-details.html',
        controller: 'BooksDetailsController'
      }
    },
    ncyBreadcrumb: {
      label: '{{book.name}}'
    }
  }).state('books-edit', {
    parent: 'books-details',
    url: '/edit',
    views: {
      'content@': {
        templateUrl: './templates/books/books-edit.html',
        controller: 'BooksEditController'
      }
    },
    ncyBreadcrumb: {
      label: 'edit'
    }
  })

});
