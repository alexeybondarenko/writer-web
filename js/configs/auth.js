'use strict';

angular.module('app').run(function ($rootScope, $state, AuthService) {

  $rootScope.$on('$stateChangeStart', function (e, toState, params, fromState) {

    var isAuth = toState.auth;
    if (!isAuth || AuthService.isAuthenticated()) return;

    e.preventDefault();
    $state.go('login');
  })

});
