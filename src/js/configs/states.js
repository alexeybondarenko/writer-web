'use strict';

angular.module('app').config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider.state('library', {
    url: '/library',
    auth: true,
    views: {
      'content': {
        templateUrl: './templates/library.html',
        controller: 'LibraryController',
        resolve: {
          user: function ($writer) {
            return $writer.user();
          }
        }
      }
    }
  });

  $stateProvider.state('profile', {
    url: '/profile',
    auth: true,
    views: {
      'content': {
        templateUrl: './templates/profile.html',
        controller: 'ProfileController',
        resolve: {
          user: function (User) {
            return User.my();
          }
        }
      }
    }
  }).state('profile-edit', {
    url: '/profile/edit',
    auth: true,
    views: {
      'content': {
        templateUrl: './templates/profile-edit.html',
        controller: 'ProfileEditController',
        resolve: {
          user: function (User) {
            return User.my();
          }
        }
      }
    }
  });

  $stateProvider.state('user', {
    url: '/user/:userId',
    auth: true,
    views: {
      'content': {
        templateUrl: './templates/user.html',
        controller: 'UserController',
        resolve: {
          user: function (User, $stateParams) {
            return User.byId($stateParams.userId);
          }
        }
      }
    }
  });


  $urlRouterProvider.otherwise('/')

});
