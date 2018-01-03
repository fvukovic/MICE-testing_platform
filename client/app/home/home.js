'use strict';

var app = angular.module('myApp.home', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function ($routeProvider, $scope) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function ($scope, $translate,$http) {
  var request = $http({
    method: "GET",
    url: '/menu',   
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

});

request.success(function (data) {
    alert("Prijedlog poslan!"+data);

});
request.error(function (data) {
  alert("Prijedlog poslan!"+data);

});
  if(window.localStorage.getItem("language")==null){
    window.localStorage.setItem("language","en")
  }
  if(window.localStorage.getItem("language")=="en"){
    $("#language").html("English");
    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-us");
  }
  if(window.localStorage.getItem("language")=="hr"){
    $("#language").html("Hrvatski");
    $("#flag").removeClass();
    $("#flag").addClass("flag");
    $("#flag").addClass("flag-hr");
  }
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

