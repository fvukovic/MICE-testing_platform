'use strict';

angular.module('myApp.conference-info', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/conference-info', {
    templateUrl: 'conference-info/conference-info.html',
    controller: 'ConferenceInfoCtrl'
  });
}])

.controller('ConferenceInfoCtrl', [function() {

}]);