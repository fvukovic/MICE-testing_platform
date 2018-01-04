'use strict';

var app = angular.module('myApp.menu', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'MenuCtrl'
  });
}])

app.controller('MenuCtrl', function ($scope, $http, $translate) {
  $scope.user = {
    username: "",
    password: "",
  }
  alert(window.localStorage.getItem("user"));
  if (window.localStorage.getItem("user") == 1) {
    $scope.logg = false;
    $scope.register = "/registration"
    $scope.username = window.localStorage.getItem("username")
  } else {
    $scope.logg = true;
    $scope.register = "/register"
  }


  var request = $http({
    method: "GET",
    url: 'http://localhost:3000/menu',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  });
  request.success(function (data) {
    $scope.menu = data;
    console.log(data);

  });

  $scope.logout = function () {
    window.localStorage.removeItem("user");
    window.location.reload();
  }

  $scope.login = function () {
    alert($scope.user.password);
    var request = $http({
      method: "post",
      url: 'http://localhost:3000/login',
      data: $scope.user

    });
    request.success(function (data) {
      console.log(data);
      if (data.status == 1) {
        alert("Uspjesno ste prijavili");
        window.localStorage.setItem("user", 1)
        window.location.reload();
        window.localStorage.setItem("username", $scope.user.username);
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