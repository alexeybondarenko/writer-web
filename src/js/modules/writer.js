'use strict';

angular.module('writer', [])
.service('$writer', function ($httpParamSerializer, $http, $log) {

  var config = {
    apiEnpoint: 'http://writer-api.herokuapp.com'
  };

  function $request (opts, data) {

    var endpoint = opts.endpoint,
        method = opts.method || 'get',
        params = opts.params || {};

    if (angular.isUndefined(endpoint)) {
      throw Error ('undefined request enpoint');
    }

    endpoint = config.apiEnpoint + endpoint;
    endpoint += '?' + $httpParamSerializer(params);

    return $http({
      method: method,
      url: endpoint,
      headers: {
        'Content-type': 'application/json'
      },
      data: data || null
    }).then(function (resp) {
      $log.debug('$writer: response', resp);
      return resp;
    })
  }
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

});