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
    }
  }).state('books-create', {
    parent: 'auth',
    url: '/books/create',
    views: {
      'content@': {
        templateUrl: './templates/books/books-create.html',
        controller: 'BooksCreateController'
      }
    }
  });

  $stateProvider.state('books-id', {
    abstract: true,
    parent: 'auth',
    url: '/books/:bookId',
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
    }
  }).state('books-edit', {
    parent: 'books-id',
    url: '/edit',
    views: {
      'content@': {
        templateUrl: './templates/books/books-edit.html',
        controller: 'BooksEditController'
      }
    }
  })

});
