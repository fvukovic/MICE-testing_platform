'use strict';

 

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mice/:idConference/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    

    .controller('RegisterCtrl', function ($scope, $http,$location,$routeParams,$translate, $rootScope) {
        $scope.language = $translate.use();
        if(window.localStorage.getItem("user")==1){
            $location.path('/registration')
        } 

        $scope.user = {
            address_city :"",
            address_country_id  :  "required",
            address_postal  :  "required",
            address_street  :    "required",
            company_address_city  :  "hidden",
            company_address_country_id  :  "hidden",
            company_address_postal   :   "hidden",
            company_address_street  :     "hidden",
            company_name  :   "hidden",
            company_vat_no  :  "hidden",
            date_of_birth  :  "hidden",
            email  :  "required",
            gender  :    "hidden",
            mobile   :  "hidden",
            name   :   "required",
            note   :  "hidden",
            password    :  "required",
            phone   :   "hidden",
            surname  :    "required",
            travel_document_number  :   "hidden",
            username   :  "required",
            vat_pin   :   "hidden",
        }
        
        console.log("RputeController");
        var request = $http({
          method: "POST",
          url: 'http://localhost:3000/conference',
          data: { conference_name: $routeParams.idConference },
      
        });
        request.success(function (data) {
            console.log(data); 
            $scope.inputs = data.user_additional_setup;

        if(data.user_setup.address_city=="hidden"){
            $("#address_city").hide();
        }else{
            if(data.user_setup.address_city=="required"){
                $scope.address_city = true;
                $("#address_city_input").prop('required',true);
            }else{
                $scope.address_city = false;
            }
        }
        if(data.user_setup.address_country_id=="hidden"){
            $("#address_country_id").hide();
        }else{
            if(data.user_setup.address_country_id=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.address_country_id = false;
            }
        }
        if(data.user_setup.address_postal=="hidden"){
            $("#address_postal").hide();
        }else{
            if(data.user_setup.address_postal=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.address_postal = false;
            }
        }
        if(data.user_setup.address_street=="hidden"){
            $("#address_street").hide();
        }else{
            if(data.user_setup.address_street=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.address_street = false;
            }
        }
        if(data.user_setup.company_address_city=="hidden"){
            $("#company_address_city").hide();
        }else{
            if(data.user_setup.company_address_city=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.company_address_city = false;
            }
        }
        if(data.user_setup.company_address_country_id=="hidden"){
            $("#company_address_country_id").hide();
        }
        else{
            if(data.user_setup.company_address_country_id=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.company_address_country_id = false;
            }
        }
        if(data.user_setup.company_address_postal=="hidden"){
            $("#company_address_postal").hide();
        }else{
            if(data.user_setup.company_address_postal=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.company_address_postal = false;
            }
        }
        if(data.user_setup.company_address_street=="hidden"){
            $("#company_address_street").hide();
        }else{
            if(data.user_setup.company_address_street=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.company_address_street = false;
            }
        }
        if(data.user_setup.company_vat_no=="hidden"){
            $("#company_vat_no").hide();
        }else{
            if(data.user_setup.company_vat_no=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.company_vat_no = false;
            }
        }
        if(data.user_setup.date_of_birth=="hidden"){
            $("#date_of_birth").hide();
        }else{
            if(data.user_setup.date_of_birth=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.date_of_birth = false;
            }
        }
        if(data.user_setup.email=="hidden"){
            $("#email").hide();
        }else{
            if(data.user_setup.email=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.email = false;
            }
        }
        if(data.user_setup.gender=="hidden"){
            $("#gender").hide();
        }else{
            if(data.user_setup.gender=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.gender = false;
            }
        }
        if(data.user_setup.mobile=="hidden"){
            $("#mobile").hide();
        }else{
            if(data.user_setup.mobile=="required"){
                $("#address_city_input").prop('required',true);
            }else{
                $scope.mobile = false;
            }
        }
        if(data.user_setup.name=="hidden"){
            $("#name").hide();
        } else{
            if(data.user_setup.name=="required"){
                $("#name_input").prop('required',true);
            }else{
                $scope.name = false;
            }
        }
        if(data.user_setup.note=="hidden"){
            $("#note").hide();
        }else{
            if(data.user_setup.note=="required"){
                $("#note_input").prop('required',true);
            }else{
                $scope.note = false;
            }
        }
        if(data.user_setup.password=="hidden"){
            $("#password").hide();
        }else{
            if(data.user_setup.password=="required"){
                $("#password_input").prop('required',true);
            }else{
                $scope.password = false;
            }
        }
        if(data.user_setup.phone=="hidden"){
            $("#phone").hide();
        }else{
            if(data.user_setup.phone=="required"){
                $("#phone_input").prop('required',true);
            }else{
                $scope.phone = false;
            }
        }
        if(data.user_setup.username=="hidden"){
            $("#username").hide();
        }else{
            if(data.user_setup.username=="required"){
                $("#username_input").prop('required',true);
            }else{
                $scope.username = false;
            }
        }
        if(data.user_setup.surname=="hidden"){
            $("#surname").hide();
        }else{
            if(data.user_setup.surname=="required"){
                $("#surname_input").prop('required',true);
            }else{
                $scope.surname = false;
            }
        }
        if(data.user_setup.travel_document_number=="hidden"){
            $("#travel_document_number").hide();
        }else{
            if(data.user_setup.travel_document_number=="required"){
                $("#travel_document_number_input").prop('required',true);
            }else{
                $scope.travel_document_number = false;
            }
        }
        if(data.user_setup.vat_pin=="hidden"){
            $("#vat_pin").hide();
        }else{
            if(data.user_setup.vat_pin=="required"){
                $("#vat_pin_input").prop('required',true);
            }else{
                $scope.vat_pin = false;
            }
        }

        });
         
        $scope.getNumber = function (num) {
            return new Array(num);
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

        $rootScope.$on('$translateChangeSuccess', function(event, current, previous) {
     
            if($translate.use()=="en"){
              $scope.language ="en";
           }else{
            $scope.language ="hr";
           } 
        });
        

    });