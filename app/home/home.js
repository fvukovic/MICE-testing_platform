'use strict';

var app = angular.module('myApp.home', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function ($scope, $translate) {
  $scope.change = function (language) {
    $translate.use(language); 
    if (language == "en") {
      language = "us"
      $("#language").html("English");
    }
    if (language == "hr") {
      $("#language").html("Hrvatski");
    }

    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-" + language);
    window.localStorage.setItem("language", language);
  }
});

