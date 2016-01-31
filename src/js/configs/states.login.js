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
  });

});
