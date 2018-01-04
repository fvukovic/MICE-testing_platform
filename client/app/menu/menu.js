'use strict';

var app = angular.module('myApp.menu', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'MenuCtrl'
  });
}])

app.controller('MenuCtrl', function ($scope, $http, $translate) {


  var request = $http({
    method: "GET",
    url: 'http://localhost:3000/menu',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  });
  request.success(function (data) {
    $scope.menu = data;
    console.log(data);

  });

  $scope.login = function () {
    var request = $http({
      method: "post",
      url: 'http://localhost:3000/login',
      data: { "username": "adm222din", "email": "ema2d2dil", "password": "123" },

    });
    request.success(function (data) {
      if (data.status == 1) {
        alert("Uspjesno ste prijavili");
      } else {
        alert("lose jaro ");
      }

    });


    request.error(function (data) {

    })
  }



  $scope.change = function (language) {
  }

  $scope.externalLink = function (externalHtml) {
    window.localStorage.setItem("externalHtml", JSON.stringify(externalHtml));
  } 
  if (window.localStorage.getItem("language") == null) {
    window.localStorage.setItem("language", "en")
    $scope.language = "en";
  }
  if (window.localStorage.getItem("language") == "en") {
    $("#language").html("English");
    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-us");
    $scope.language = "en";
  }
  if (window.localStorage.getItem("language") == "hr") {
    $("#language").html("Hrvatski");
    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-hr");
    $scope.language = "hr";
  }
  $scope.change = function (language) {
    $translate.use(language); 
    if (language == "en") {
      language = "us"
      window.localStorage.setItem("language", "en");
      $("#language").html("English");
    }
    if (language == "hr") {
      $("#language").html("Hrvatski");
      window.localStorage.setItem("language", "hr");
    }

    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-" + language);
     
  } 
});