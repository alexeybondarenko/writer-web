'use strict';

angular.module('app').config(function ($stateProvider) {

  $stateProvider.state('profile', {
    parent: 'auth',
    url: '/profile',
    views: {
      'content@': {
        templateUrl: './templates/profile.html',
        controller: 'ProfileController',
        resolve: {
          books: function (User) {
            return User.my.fetchBooks();
          }
        }
      }
    }
  }).state('profile-edit', {
    parent: 'auth',
    url: '/profile/edit',
    views: {
      'content@': {
        templateUrl: './templates/profile-edit.html',
        controller: 'ProfileEditController'
      }
    }
  });

});
