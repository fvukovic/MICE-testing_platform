'use strict';

angular.module('myApp.indeks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/indeks', {
    templateUrl: 'indeks/indeks.html',
    controller: 'IndeksCtrl'
  });
}])

.controller('IndeksCtrl', function($scope, $sce) {

  $scope.trustedHtml = function () {
    return $sce.trustAsHtml(window.localStorage.getItem("externalHtml"));
}
});