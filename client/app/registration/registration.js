'use strict';

angular.module('myApp.registration', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/registration', {
      templateUrl: 'registration/registration.html',
      controller: 'RegistrationCtrl'
    });
  }])

 
  .controller('RegistrationCtrl', function ($scope, $http, $rootScope,$translate, $location) {
    $scope.language = window.localStorage.getItem("language");
    $scope.cost=0;
    if(window.localStorage.getItem("user")==0){
      $location.path('/register');
  }
    var request = $http({
      method: "GET",
      url: 'http://localhost:3000/products',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  
    });
    request.success(function (data) {
      $scope.products = data; 
      console.log(data);
    });

$scope.addToCard = function(){
  $scope.cost=0;
  $("input:checked").each(function () {
    var id = $(this).attr("id").substring(8);
  
    var cost =  $("#price"+id).text().replace("€",""); 
    console.log(":: "+$("#quantity"+id).val() +"  "+cost);  
    if(+ $("#quantity"+id).val()>0){ 
        $scope.cost += +$("#quantity"+id).val() * +cost;
    } 


});
}



    $scope.register = function () {
      var request = $http({
        method: "post",
        url: 'http://localhost:3000/register',
        data: $scope.user

      }); 
    }  
    $rootScope.$on('$translateChangeSuccess', function(event, current, previous) {
     
      if($translate.use()=="en"){
        $scope.language ="en";
     }else{
      $scope.language ="hr";
     } 
  });
  
   
 

    }); 
