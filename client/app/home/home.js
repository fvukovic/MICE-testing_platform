'use strict';

var app = angular.module('myApp.home', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/bad_request', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function ($scope, $translate, $http) {
  window.localStorage.removeItem("user") 
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("id_conference");
});

