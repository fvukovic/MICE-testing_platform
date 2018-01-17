'use strict';

angular.module('myApp.registration', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/:conferenceId/registration', {
      templateUrl: 'registration/registration.html',
      controller: 'RegistrationCtrl'
    });
  }])


  .controller('RegistrationCtrl', function (api,$scope, $http, $rootScope, $translate, $location) {
    $scope.language = window.localStorage.getItem("language");
    $scope.cost = 0;
    $scope.model = [];
    if (window.localStorage.getItem("user") != 1) {
      $location.path('/' + window.localStorage.getItem("conference") + '/register');
    }
    $scope.number = 5;
    $scope.getNumber = function (num) {
      return new Array(num);
    }

    var request = $http({
      method: "POST",
      url: api+'/products',
      data: { id_conference: window.localStorage.getItem("id_conference") }

    });
    request.success(function (data) {
      $scope.products = data;
      for (var x = 0; x < data.length; x++) {

      }
      console.log(data);
    });

    $scope.addToCard = function () {
      $scope.cost = 0;
      $("input:checked").each(function () {
        var id = $(this).attr("id").substring(8);
        var cost = $("#price" + id).text().replace("€", "");
        console.log(":: " + $("#quantity" + id).val() + "  " + cost);
        console.log("#quantity" + id);
        console.log(id);
        if (+ $("#quantity" + id).val() > 0) {
          $scope.cost += +$("#quantity" + id).val() * +cost;
        }
      });
    } 

    $scope.changeValue = function (id, group, conference_id) {
      if (group == true) {
        for (var x = 0; x < +$("#quantity" + id).val(); x++) {
          if (x == 0) {
            $("#main" + id).html("<div id='html" + id + "'>" + $("#html" + id).html() + "</div>");
          } else {
            $("#main" + id).append($("#html" + id).html());
          }

        }

      }

      $scope.addToCard();
    }

    $scope.register = function () {
      $("input:checked").each(function () {
        var id = $(this).attr("id").substring(8);
        $('.html'+id).each(function(i, obj) {
           
      });
        
      });




      var request = $http({
        method: "post",
        url: api+'/register',
        data: $scope.user

      });
    }
    $rootScope.$on('$translateChangeSuccess', function (event, current, previous) {

      if ($translate.use() == "en") {
        $scope.language = "en";
      } else {
        $scope.language = "hr";
      }
    });
 
  }); 
