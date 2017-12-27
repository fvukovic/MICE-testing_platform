'use strict';

angular.module('myApp.abstracts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/abstracts', {
    templateUrl: 'abstracts/abstracts.html',
    controller: 'AbstractsCtrl'
  });
}])

.controller('AbstractsCtrl', [function() {

}]);