'use strict';

var app = angular.module('app', [
  'ui.router',
  'ui.mask',
  'ngStorage',
  'ngSanitize',

  'writer'
]);

function parseUrl (url) {
  var obj = {};
  var pairs = url.split('&');
  for(var i in pairs){
      var split = pairs[i].split('=');
      obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
  }
  return obj;
}

angular.module('app').constant('ENV', {

  debug: true,
  version: '1.0.0'

}).config(function ($locationProvider, $logProvider, ENV) {

  $locationProvider.html5Mode(false).hashPrefix('!');
  $logProvider.debugEnabled(ENV.debug);

}).run(function ($rootScope, $state, AuthService) {

  $rootScope.user = null;
  $rootScope.logout = function () {
    AuthService.logout();
    $rootScope.user = null;
    $state.go('index');
  };

}).run(function() {

  if (typeof FastClick !== 'undefined') {
    FastClick.attach(document.body);
    window.scrollBy(0, 1);
  }

}).constant('URL', angular.extend({}, URL, parseUrl(location.search.substr(1))));
