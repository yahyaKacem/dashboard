'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $scope.dashboardVersion = ".1";
  $scope.environments = [];
  var environments = ['development', 'staging', 'production'];
  _.each(environments, function(environment) {
    $http.get('/api/tests/'+environment).
    success(function(data, status, headers, config) {
      $scope.environments.push(data);
    });
  });

  $scope.modifyTest = function(test){
    window.location.hash = '#/'+test.id;
  }
}

function TestCtrl($scope, $http, $routeParams) {
  $http.get('/api/test/' + $routeParams.id).
  success(function(data) {
    console.log(data);
    $scope.test = data;
  });
}

function EnvCtrl($scope, $http, $routeParams) {
  $http.get('/api/environment/' + $routeParams.id).
  success(function(data) {
    console.log(data);
    $scope.environment = data;
  });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/api/post', $scope.form).
    success(function(data) {
      $location.path('/');
    });
  };
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.form = data.post;
  });

  $scope.editPost = function() {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
    success(function(data) {
      $location.url('/readPost/' + $routeParams.id);
    });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.post = data.post;
  });

  $scope.deletePost = function() {
    $http.delete('/api/post/' + $routeParams.id).
    success(function(data) {
      $location.url('/');
    });
  };

  $scope.home = function() {
    $location.url('/');
  };
}