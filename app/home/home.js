'use strict';

var app = angular.module('myApp.home', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function($routeProvider,$scope) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function($scope,$translate) { 
  $scope.change = function(language){ 
    $translate.use(language); 
    window.localStorage.setItem("language",language);
    
}
});

 