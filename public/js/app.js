'use strict';

// Declare app level module which depends on filters, and services
// angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
angular.module('dashboard', []).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/index',
    controller: IndexCtrl
  }).
  when('/:id', {
    templateUrl: 'partials/test',
    controller: TestCtrl
  }).
  otherwise({
    redirectTo: '/'
  });
}]);