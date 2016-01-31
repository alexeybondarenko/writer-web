'use strict';

angular.module('app').config(function ($stateProvider) {

  $stateProvider.state('register', {
    url: '/register',
    views: {
      'content': {
        templateUrl: './templates/register.html',
        controller: 'RegisterController'
      }
    }
  }).state('register-success', {
    url: '/register/success',
    views: {
      'content': {
        templateUrl: './templates/register-success.html'
      }
    }
  }).state('register-failure', {
    url: '/register/failure',
    views: {
      'content': {
        templateUrl: './templates/register-failure.html'
      }
    }
  })

});
