'use strict';

angular.module('app').config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider.state('auth', {
    abstract: 'true',
    resolve: {
      user: function (User, $rootScope) {
        if ($rootScope.user) return $rootScope.user;
        return User.my().then(function (user) {
          $rootScope.user = user;
          return user;
        })
      }
    }
  }).state('maybeauth', {
    abstract: 'true',
    resolve: {
      user: function (User, $rootScope) {
        if ($rootScope.user) return $rootScope.user;
        return User.my().then(function (user) {
          $rootScope.user = user;
          return user;
        }).catch(function (resp) {
          return new User();
        });
      }
    }
  });

  $stateProvider.state('index', {
    url: '/',
    views: {
      'content@': {
        templateUrl: './templates/index.html'
      }
    }
  });

  $stateProvider.state('library', {
    parent: 'auth',
    url: '/library',
    views: {
      'content@': {
        templateUrl: './templates/library.html',
        controller: 'LibraryController'
      }
    }
  });

  $stateProvider.state('user', {
    parent: 'auth',
    url: '/user/:userId',
    views: {
      'content@': {
        templateUrl: './templates/user.html',
        controller: 'UserController',
        resolve: {
          profile: function (User, $stateParams) {
            return User.byId($stateParams.userId).fetch();
          },
          books: function (User, $stateParams) {
            return User.byId($stateParams.userId).fetchBooks();
          }
        }
      }
    }
  });


  $urlRouterProvider.otherwise('/')

});
