'use strict';

var app = angular.module('myApp.home', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function ($scope, $translate, $http) {
  $scope.fili ="";
  var request = $http({
    method: "GET",
    url: 'http://localhost:3000/menu',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  });

  request.success(function (data) {
    console.log(data);
    for (var x = 0; x < data.length; x++) {
      console.log(data[x].address);
      for (var y = 0; y < data[x].length; y++) {

      }
    }

  });
  request.error(function (data) {
    console.log(data);
  });

});

