'use strict';

angular.module('app').run(function (AuthService) {
  AuthService.loadToken();
}).service('AuthService', function ($writer, $localStorage, $rootScope) {

  var $storage = $localStorage.$default({
    token: null
  });

  var isAuth = false;
  this.check = function () {
    $writer.user().then(function () {
      isAuth = true;
    }, function () {
      isAuth = false;
    })
  };
  this.isAuthenticated = function () {
    return isAuth;
  };

  this.saveToken = function (token) {
    $storage.token = token;
  };
  this.loadToken = function () {
    var token = $storage.token;
    if (!token) return;
    $writer.setToken(token);
    isAuth = true;
  };

  this.login = function (username, password) {

    return $writer.login(username, password).then(function (resp) {
      if (!resp.data.access_token) throw new Error('undefined access token after success login');

      $writer.setToken(resp.data.access_token);
      this.saveToken(resp.data.access_token);

      isAuth = true;
      return resp;

    }.bind(this));
  };

  this.logout = function () {
    $writer.setToken(null);
    this.saveToken(null);
    isAuth = false;
  };

});
