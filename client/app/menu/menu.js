'use strict';

var app = angular.module('myApp.menu', ['ngRoute', 'pascalprecht.translate'])

app.config(['$routeProvider', function($routeProvider, $scope) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'MenuCtrl'
  });
}])

app.controller('MenuCtrl', function($scope, $http) { 
 

  var request = $http({
    method: "GET",
    url: 'http://localhost:3000/menu',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  });

  request.success(function (data) { 
    $scope.menu = data;
 
  });
 
  $scope.change = function(language){
    alert(language);
}

$scope.externalLink = function(externalHtml){
  window.localStorage.setItem("externalHtml",externalHtml)
}

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