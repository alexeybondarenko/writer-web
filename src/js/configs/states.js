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
          user: function ($writer) {
            return $writer.user();
          }
        }
      }
    }
  });

  $urlRouterProvider.otherwise('/')

});
