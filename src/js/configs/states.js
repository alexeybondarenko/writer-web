'use strict';

angular.module('app').config(function ($stateProvider, $locationProvider, $urlRouterProvider) {


  $stateProvider.state('login', {
    url: '/login',
    views: {
      'content': {
        templateUrl: './templates/login.html',
        controller: 'LoginController'
      }
    }
  }).state('reset', {
    url: '/reset',
    views: {
      'content': {
        templateUrl: './templates/reset.html',
        controller: 'ResetController'
      }
    }
  }).state('reset-confirm', {
    url: '/reset/confirm',
    views: {
      'content': {
        templateUrl: './templates/reset-confirm.html',
        controller: 'ResetConfirmController'
      }
    }
  }).state('reset-failure', {
    url: '/reset/failure',
    views: {
      'content': {
        templateUrl: './templates/reset-failure.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/')

});
