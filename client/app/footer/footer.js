'use strict';

angular.module('myApp.view1', ['ngRoute'])
 

.controller('View1Ctrl', function($scope,$http,api,$translate,$sce,$rootScope) {  
  var request = $http({
		method: "POST",
		url: api+'/conference',
		data: { conference_name: window.localStorage.getItem("conference") },

	});
	request.success(function (data) {
    console.log(data);
    $scope.footer=   $sce.trustAsHtml( data.footer[$translate.use()]);  

  });

  $rootScope.$on('$translateChangeSuccess', function (event, current, previous) {
    window.location.reload();
      });
    
});