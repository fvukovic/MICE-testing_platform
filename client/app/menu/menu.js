'use strict';

var app = angular.module('myApp.menu', ['ngRoute', 'pascalprecht.translate'])

 
app.controller('MenuCtrl', function ($scope, $http, $translate,$routeParams,$location) { 
		$scope.user = {              
			username: "",
			password: "",
			
	}  


	 
	if (window.localStorage.getItem("user") == 1) {
		$scope.logg = false;
		$scope.register = "/registration" 
	} else {
		$scope.logg = true;
		$scope.register = "/register"
	}

	var request = $http({
        method: "POST",
        url: 'http://localhost:3000/menu',
        data:{conference_name: window.localStorage.getItem("conference" )}, 
    
      });
	request.success(function (data) { 
		console.log(data);
		$scope.name = window.localStorage.getItem("conference") ;
		$scope.menu = data; 
		$scope.name_conf=data.conference.name[$translate.use()];
	}); 

	$scope.logout = function () {
		window.localStorage.removeItem("user");
		window.location.reload();
	}

	$scope.login = function () { 
		var request = $http({
			method: "post",
			url: 'http://localhost:3000/login',
			data: $scope.user

		});
		request.success(function (data) {
			console.log(data);
			if (data.status == 1) { 
				window.localStorage.setItem("user", 1)
				window.location.reload();
				window.localStorage.setItem("username", $scope.user.username);
			} else { 
				if(data.username==0){
					$("#error_msg").text("Username does not exist!");
				} 
				else{ 
					$("#error_msg").text("Wrong password");
				}
		 
			}

		});


		request.error(function (data) {

		})
	}

 
	$scope.externalLink = function (externalHtml,url) {  
		console.log($location.$$absUrl.substring(0,$location.$$absUrl.length-2)      +url);
		$location.url ($location.$$absUrl.substring(0,$location.$$absUrl.length-2)      +url);
	}
	if (window.localStorage.getItem("language") == null) {
		window.localStorage.setItem("language", "en")
		$scope.language = "en";
	}
	if (window.localStorage.getItem("language") == "en") {
		$("#language").html("English");
		$("#flag").removeClass();
		$("#flag").addClass("flag");
		$("#flag").addClass("flag-us");
		$scope.language = "en";
	}
	if (window.localStorage.getItem("language") == "hr") {
		$("#language").html("Hrvatski");
		$("#flag").removeClass();
		$("#flag").addClass("flag");
		$("#flag").addClass("flag-hr");
		$scope.language = "hr";
	}
	$scope.change = function (language) {
		$translate.use(language);
		if (language == "en") {
			language = "us"
			$scope.language="en";
			window.localStorage.setItem("language", "en");
			$("#language").html("English");
		}
		if (language == "hr") {
			$scope.language="hr";
			$("#language").html("Hrvatski");
			window.localStorage.setItem("language", "hr");
		}

		$("#flag").removeClass();
		$("#flag").addClass("flag");
		$("#flag").addClass("flag-" + language);
	

	}
});