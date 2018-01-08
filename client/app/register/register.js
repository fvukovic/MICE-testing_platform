'use strict';

 

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mice/:idConference/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    

    .controller('RegisterCtrl', function ($scope, $http,$location,$routeParams) {
        if(window.localStorage.getItem("user")==1){
            $location.path('/registration')
        } 

        console.log("RputeController");
        var request = $http({
          method: "POST",
          url: 'http://localhost:3000/conference',
          data: { conference_name: $routeParams.idConference },
      
        });
        request.success(function (data) {
            
        if(data.user_setup.address_city=="hidden"){
            $("#address_city").hide();
        }
        if(data.user_setup.address_country_id=="hidden"){
            $("#address_country_id").hide();
        }
        if(data.user_setup.address_postal=="hidden"){
            $("#address_postal").hide();
        }
        if(data.user_setup.address_street=="hidden"){
            $("#address_street").hide();
        }
        if(data.user_setup.company_address_city=="hidden"){
            $("#company_address_city").hide();
        }
        if(data.user_setup.company_address_country_id=="hidden"){
            $("#company_address_country_id").hide();
        }
        if(data.user_setup.company_address_postal=="hidden"){
            $("#company_address_postal").hide();
        }
        if(data.user_setup.company_address_street=="hidden"){
            $("#company_address_street").hide();
        }
        if(data.user_setup.company_vat_no=="hidden"){
            $("#company_vat_no").hide();
        }
        if(data.user_setup.date_of_birth=="hidden"){
            $("#date_of_birth").hide();
        }
        if(data.user_setup.email=="hidden"){
            $("#email").hide();
        }
        if(data.user_setup.gender=="hidden"){
            $("#gender").hide();
        }
        if(data.user_setup.mobile=="hidden"){
            $("#mobile").hide();
        }
        if(data.user_setup.name=="hidden"){
            $("#name").hide();
        } 
        if(data.user_setup.note=="hidden"){
            $("#note").hide();
        }
        if(data.user_setup.password=="hidden"){
            $("#password").hide();
        }
        if(data.user_setup.phone=="hidden"){
            $("#phone").hide();
        }
        if(data.user_setup.username=="hidden"){
            $("#username").hide();
        }
        if(data.user_setup.surname=="hidden"){
            $("#surname").hide();
        }
        if(data.user_setup.travel_document_number=="hidden"){
            $("#travel_document_number").hide();
        }
        if(data.user_setup.vat_pin=="hidden"){
            $("#vat_pin").hide();
        }

        });
         
        $scope.getNumber = function (num) {
            return new Array(num);
        }
        $scope.user = {
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
            request.success(function (data) {
                console.log(data);
                if (data.status == 1) { 
                    window.localStorage.setItem("username",$scope.user.username);
                    window.localStorage.setItem("user","1");
                    window.location.reload();
                    $location.path('/registration')

                } else {
                    if(data.username==0){
                        $("#error_username").text("Username already exist!")  
                    }else
                    {
                        $("#error_username").text("")     
                    }
                    if(data.email==0){
                        $("#error_email").text("This E-mail is already used!");
                    }
                }
 

            });
        }



        $(document).on('click', '#close-preview', function () {
            $('.image-preview').popover('hide');
            // Hover befor close the preview
            $('.image-preview').hover(
                function () {
                    $('.image-preview').popover('show');
                },
                function () {
                    $('.image-preview').popover('hide');
                }
            );
        });

        $(function () {
            // Create the close button
            var closebtn = $('<button/>', {
                type: "button",
                text: 'x',
                id: 'close-preview',
                style: 'font-size: initial;',
            });
            closebtn.attr("class", "close pull-right");
            // Set the popover default content
            $('.image-preview').popover({
                trigger: 'manual',
                html: true,
                title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
                content: "There's no image",
                placement: 'bottom'
            });
            // Clear event
            $('.image-preview-clear').click(function () {
                $('.image-preview').attr("data-content", "").popover('hide');
                $('.image-preview-filename').val("");
                $('.image-preview-clear').hide();
                $('.image-preview-input input:file').val("");
                $(".image-preview-input-title").text("Browse");
            });
            // Create the preview image
            $(".image-preview-input input:file").change(function () {
                var img = $('<img/>', {
                    id: 'dynamic',
                    width: 250,
                    height: 200
                });
                var file = this.files[0];
                var reader = new FileReader();
                // Set preview image into the popover data-content
                reader.onload = function (e) {
                    $(".image-preview-input-title").text("Change");
                    $(".image-preview-clear").show();
                    $(".image-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
                }
                reader.readAsDataURL(file);
            });
        });
    });