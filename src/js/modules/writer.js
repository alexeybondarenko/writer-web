'use strict';

angular.module('writer', [])
  .service('$writer', function ($httpParamSerializer, $http, $log, $q) {

    var config = {
      apiEnpoint: 'http://writer-api.herokuapp.com',
      token: null
    };

    function $request(opts, data) {

      var endpoint = opts.endpoint,
        method = opts.method || 'get',
        params = opts.params || {};

      if (angular.isUndefined(endpoint)) {
        throw Error('undefined request enpoint');
      }

      endpoint = config.apiEnpoint + endpoint;
      endpoint += '?' + $httpParamSerializer(params);

      var headers = {
        'Content-type': 'application/json'
      };
      if (config.token) {
        headers['Authorization'] = 'Bearer ' + config.token;
      }

      return $http({
        method: method,
        url: endpoint,
        headers: headers,
        data: data || null
      }).then(function (resp) {
        $log.debug('$writer: response', resp);
        return resp;
      });
    }

    this.setToken = function (token) {
      config.token = token;
    };

    this.login = function (email, password) {
      return $request({
        method: 'post',
        endpoint: '/login'
      }, {
        email: email,
        password: password
      });
    };
    this.logout = function () {
      return $request({
        method: 'post',
        endpoint: '/logout'
      });
    };

    this.register = function (email, password, options) {

      var successUrl = options.successUrl,
        failureUrl = options.failureUrl;

      return $request({
        method: 'post',
        endpoint: '/register'
      }, {
        email: email,
        password: password,
        successUrl: successUrl,
        failureUrl: failureUrl
      });

    };
    this.registerConfirm = function (email, token, options) {

      var successUrl = options.successUrl,
        failureUrl = options.failureUrl;

      return $request({
        method: 'post',
        endpoint: '/register/confirm',
        params: {
          email: email,
          token: token,
          successUrl: successUrl,
          failureUrl: failureUrl
        }
      });

    };

    this.reset = function (email, options) {

      var successUrl = options.successUrl,
        failureUrl = options.failureUrl;

      return $request({
        method: 'post',
        endpoint: '/reset'
      }, {
        email: email,
        successUrl: successUrl,
        failureUrl: failureUrl
      });

    };

    this.resetCheck = function (email, token, options) {

      var successUrl = options.successUrl,
        failureUrl = options.failureUrl;

      return $request({
        method: 'post',
        endpoint: '/reset/check',
        params: {
          email: email,
          token: token,
          successUrl: successUrl,
          failureUrl: failureUrl
        }
      });

    };

    this.resetConfirm = function (email, token, password) {

      return $request({
        method: 'post',
        endpoint: '/reset/confirm'
      }, {
        email: email,
        token: token,
        password: password
      });

    };

    this.user = function () {
      return $request({method: 'get', endpoint: '/user'});
    };
    this.userUpdate = function (user) {
      return $request({method: 'patch', endpoint: '/user'}, {
        name: user.name,
        description: user.description
      });
    };
    this.userDelete = function (user) {
      return $request({method: 'delete', endpoint: '/user'});
    };

    this.userFollowers = function () {
      return $request({method: 'get', endpoint: '/user/followers'});
    };
    this.userFollowings = function () {
      return $request({method: 'get', endpoint: '/user/followings'});
    };
    this.userReads = function () {
      return $request({method: 'get', endpoint: '/user/reads'});
    };

    this.userBooks = function () {
      return $request({method: 'get', endpoint: '/user/books'});
    };

    this.isUserFollowUser = function (targetUserID) {
      return $request({method: 'get', endpoint: '/user/followings/' + targetUserID});
    };

    this.password = function (currentPassword, newPassword) {
      return $request({method: 'get', endpoint: '/password'}, {
        currentPassword: currentPassword,
        newPassword: newPassword
      });
    };

    this.isUserFollow = function (userId) {
      return $request({
        method: 'get',
        endpoint: '/users/'+userId+'/follow'
      });
    };
    this.followUser = function (userId) {
      return $request({
        method: 'put',
        endpoint: '/users/'+userId+'/follow'
      });
    };
    this.unfollowUser = function (userId) {
      return $request({
        method: 'delete',
        endpoint: '/users/'+userId+'/follow'
      });
    };

    this.getUserById = function (userId) {
      return $request({
        method: 'get',
        endpoint: '/users/' + userId
      });
    };

    this.getUserBooks = function (userId) {
      return $request({
        method: 'get',
        endpoint: '/users/' + userId + '/books'
      });
    }

  });
