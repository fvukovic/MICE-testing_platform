'use strict';

angular.module('myApp.registration', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/registration', {
      templateUrl: 'registration/registration.html',
      controller: 'RegistrationCtrl'
    });
  }])

  .controller('RegistrationCtrl', [function ($scope, $http) {
    /* $scope.user = {
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      address: "",
      companyinfo: "",
      inputfilepreview: "",
      rememeberlogin: ""
    }
    $scope.register = function () {
      var request = $http({
        method: "post",
        url: 'http://localhost:3000/register',
        data: $scope.user

      });
    } */

    }]);
