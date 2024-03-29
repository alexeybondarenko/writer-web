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
    };

    this.createBook = function (bookObj) {
      return $request({
        method: 'post',
        endpoint: '/books/'
      }, {
        name: bookObj.name,
        description: bookObj.description,
        is_public: bookObj.is_public
      });
    };
    this.getBookById = function (bookId) {
      return $request({
        method: 'get',
        endpoint: '/books/' + bookId
      });
    };
    this.updateBookById = function (bookId, bookObj) {
      return $request({
        method: 'patch',
        endpoint: '/books/' + bookId
      }, {
        name: bookObj.name,
        description: bookObj.description,
        is_public: bookObj.is_public
      });
    };
    this.deleteBookById = function (bookId) {
      return $request({
        method: 'delete',
        endpoint: '/books/' + bookId
      });
    };
    this.getBookComments = function (bookId) {
      return $request({
        method: 'get',
        endpoint: '/books/' + bookId + '/comments'
      });
    };
    this.createBookComment = function (bookId, commentObj) {
      return $request({
        method: 'post',
        endpoint: '/books/' + bookId + '/comments'
      }, {
        message: commentObj.message
      });
    };
    this.getBooks = function (options) {

      var params = {};
      if (options.limit) params.limit = options.limit;
      if (options.offset) params.offset = options.offset;

      return $request({
        method: 'get',
        endpoint: '/books',
        params: params
      })
    };

    //  Books Sections
    this.createBookSection = function (bookId, sectionObj) {
      return $request({
        method: 'post',
        endpoint: '/books/'+bookId+'/sections'
      }, {
        name: sectionObj.name,
        content: sectionObj.content,
        status: sectionObj.status,
        is_public: sectionObj.is_public
      })
    };
    this.getBookSection = function (bookId, sectionId) {
      return $request({
        method: 'get',
        endpoint: '/books/'+bookId+'/sections/'+sectionId
      })
    };
    this.updateBookSection = function (bookId, sectionId, sectionObj) {
      return $request({
        method: 'patch',
        endpoint: '/books/'+bookId+'/sections/'+sectionId
      }, {
        name: sectionObj.name,
        content: sectionObj.content,
        status: sectionObj.status,
        is_public: sectionObj.is_public
      });
    };
    this.deleteBookSection = function (bookId, sectionId) {
      return $request({
        method: 'delete',
        endpoint: '/books/'+bookId+'/sections/'+sectionId
      });
    };
    //  Books Sections Comments
    this.getBookSectionComments = function (bookId, sectionId) {
      return $request({
        method: 'get',
        endpoint: '/books/'+bookId+'/sections/'+sectionId + '/comments'
      });
    };
    this.createBookSectionComment = function (bookId, sectionId, commentObj) {
      return $request({
        method: 'post',
        endpoint: '/books/'+bookId+'/sections/'+sectionId + '/comments'
      }, {
        message: commentObj.message
      });
    };


  });
