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
  'myApp.conference-info',
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
    'HAVE_ACC': 'Already have an account',
    'LOGIN': 'Login',
    'DOWN_LINK':"You can download mobile app via link",
    'MOBILE':'Mobile application',
    'DOWNLOAD':"Download",
    'COM_INFO':"Company info",
    'NAME_COM':"Name of Company",
    'ADDRESS':"Address",
    'PHONE':"Phone",
     //meni
     'CONF_NAME':"Conference name",
     "MAIN":"MAIN INFO",
     "CONF_INF":"Conference info",
     "LOC_HIS": "Location history",
     "WEL_SPEC":"Welcome speech",
     "REG_INFO":"REGITRATION INFO ",
     "PRO_SER":"Products/Services registration",
     "ABSTRACT":"ABSTRACT",
     "LECTURES":"LECTURES",
     "PRACTICAL":"PRACTICAL INFO",
     "FORGET":"Forget the password",
     "SIGN":"Sign in",
     "REGISTER":"Register",
     "ACCO":"Accomodation",
     "HOW":"How to get there",
     "SHOPPING":"Shopping",
     "DINNING":"Fine dining"

  });
 
  $translateProvider.translations('hr', {
    'HAVE_ACC': 'Već imaš račun',
    'LOGIN': 'Prijavi se',
    'DOWN_LINK':" Možete skinuti mobilnu aplikaciju na sljedecem linku ",
    'MOBILE':'Mobilna aplikacija',
    'DOWNLOAD':"Preuzmi",
    'COM_INFO':"Informacije o kompaniji",
    'NAME_COM':"Ime kompanije",
    'ADDRESS':"Adresa",
    'PHONE':"Telefon", 

      //meni
      'CONF_NAME':"Naziv konferencije",
      "MAIN":"GLAVNI INFO",
      "CONF_INF":"Info konferencije",
      "LOC_HIS": "Povijest lokacija",
      "WEL_SPEC":"Govor dobrodošlice",
      "REG_INFO":"REGISTRACIJA INFO ",
      "PRO_SER":"Proizvodi/Servisi registracija",
      "ABSTRACT":"ABSTRAKTNO",
      "LECTURES":"DOGAĐANJA",
      "PRACTICAL":"PRAKIČNO INFO",
      "FORGET":"Zaboravili lozinku",
      "SIGN":"Prijavi se",
      "REGISTER":"Registiraj se",
      "ACCO":"Prijedlog",
      "HOW":"Kako doći do tamo",
      "SHOPPING":"Šoping",
      "DINNING":"Fina jela"
  });
  if(window.localStorage.getItem("language")==null){
    window.localStorage.setItem("language","en")
  }
  $translateProvider.preferredLanguage(window.localStorage.getItem("language"));
}]);

