'use strict';

angular.module('myApp.indeks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/indeks', {
    templateUrl: 'indeks/indeks.html',
    controller: 'IndeksCtrl',
    
  });
}])

.controller('IndeksCtrl', function($scope, $sce) {

  $scope.trustedHtml = function () {
    var html = JSON.parse(window.localStorage.getItem("externalHtml")); 
    if(window.localStorage.getItem("language")=="en"){
       return   $sce.trustAsHtml(html["en"]); 
    }else{
      return $sce.trustAsHtml(html["hr"]); 
    } 

 
}
});