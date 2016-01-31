'use strict';

angular.module('app').service('utils', function ($state) {

  this.href = function (stateName, params) {
    return location.origin + location.pathname + $state.href(stateName, params);
  }

});
