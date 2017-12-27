'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.registration',
  'myApp.my-profile',
  'myApp.events',
  'myApp.abstracts',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'pascalprecht.translate'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'TITLE': 'Hello',
    'FOO': 'This is a paragraph'
  });
 
  $translateProvider.translations('de', {
    'TITLE': 'Hallo',
    'FOO': 'Dies ist ein Absatz'
  });
 
  $translateProvider.preferredLanguage('en');
}]);

  $("#input-id").fileinput();

