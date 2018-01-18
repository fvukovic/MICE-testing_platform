'use strict';

 

angular.module('myApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:idConference/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    

    .controller('RegisterCtrl', function (api,$scope, $http,$location,$routeParams,$translate, $rootScope) {
        $scope.language = $translate.use();
        if(window.localStorage.getItem("user")==1){
            $location.path('/'+window.localStorage.getItem("conference") +'/registration')
        } 
        $scope.user ={
            reg:"",
            id:"",
        }
        $scope.user.reg = {
            address_city :"",
            address_country_id :  "",
            address_postal :  "",
            address_street  :    "",
            company_address_city  :  "",
            company_address_country_id  :  "",
            company_address_postal :   "",
            company_address_street :     "",
            company_name :   "",
            company_vat_no :  "",
            date_of_birth:  "",
            email  :  "",
            gender  :    "",
            mobile   :  "",
            name :   "",
            note  :  "",
            password    :  "",
            phone  :   "",
            surname  :    "",
            travel_document_number :   "",
            username  :  "",
            vat_pin  :   "",
            user_additional_setup:[],
        }
        
        var request = $http({
          method: "POST",
          url: api+'/conference',
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

            }else{
                $scope.address_city = false;
            }
        }

        if(data.user_setup.company_name=="hidden"){
            $("#company_name").hide();
        }else{
            if(data.user_setup.company_name=="required"){
                $scope.address_country_id = true;
            }else{
                $scope.address_country_id = false;
            }
        }

        if(data.user_setup.address_country_id=="hidden"){
            $("#address_country_id").hide();
        }else{
            if(data.user_setup.address_country_id=="required"){
                $scope.address_country_id = true;
            }else{
                $scope.address_country_id = false;
            }
        }
        if(data.user_setup.address_postal=="hidden"){
            $("#address_postal").hide();
        }else{
            if(data.user_setup.address_postal=="required"){ 
                $scope.address_postal = true;
            }else{
                $scope.address_postal = false;
            }
        }
        if(data.user_setup.address_street=="hidden"){
            $("#address_street").hide();
        }else{
            if(data.user_setup.address_street=="required"){
                $scope.address_street = true;
            }else{
                $scope.address_street = false;
            }
        }
        if(data.user_setup.company_address_city=="hidden"){
            $("#company_address_city").hide();
        }else{
            if(data.user_setup.company_address_city=="required"){
                $scope.company_address_city = true;
            }else{
                $scope.company_address_city = false;
            }
        }
        if(data.user_setup.company_address_country_id=="hidden"){
            $("#company_address_country_id").hide();
        }
        else{
            if(data.user_setup.company_address_country_id=="required"){
                $scope.company_address_country_id = true;
            }else{
                $scope.company_address_country_id = false;
            }
        }
        if(data.user_setup.company_address_postal=="hidden"){
            $("#company_address_postal").hide();
        }else{
            if(data.user_setup.company_address_postal=="required"){
                $scope.company_address_postal = true;
            }else{
                $scope.company_address_postal = false;
            }
        }
        if(data.user_setup.company_address_street=="hidden"){
            $("#company_address_street").hide();
        }else{
            if(data.user_setup.company_address_street=="required"){
                $scope.company_address_street = true;
            }else{
                $scope.company_address_street = false;
            }
        }
        if(data.user_setup.company_vat_no=="hidden"){
            $("#company_vat_no").hide();
        }else{
            if(data.user_setup.company_vat_no=="required"){
                $scope.company_vat_no = true;
            }else{
                $scope.company_vat_no = false;
            }
        }
        if(data.user_setup.date_of_birth=="hidden"){
            $("#date_of_birth").hide();
        }else{
            if(data.user_setup.date_of_birth=="required"){
                $scope.date_of_birth = true;
            }else{
                $scope.date_of_birth = false;
            }
        }
        if(data.user_setup.email=="hidden"){
            $("#email").hide();
        }else{
            if(data.user_setup.email=="required"){
                $scope.email = true;
            }else{
                $scope.email = false;
            }
        }
        if(data.user_setup.gender=="hidden"){
            $("#gender").hide();
        }else{
            if(data.user_setup.gender=="required"){
                $scope.gender = true;
            }else{
                $scope.gender = false;
            }
        }
        if(data.user_setup.mobile=="hidden"){
            $("#mobile").hide();
        }else{
            if(data.user_setup.mobile=="required"){
                $scope.mobile = true;
            }else{
                $scope.mobile = false;
            }
        }
        if(data.user_setup.name=="hidden"){
            $("#name").hide();
        } else{
            if(data.user_setup.name=="required"){
                $scope.name = true;
            }else{
                $scope.name = false;
            }
        }
        if(data.user_setup.note=="hidden"){
            $("#note").hide();
        }else{
            if(data.user_setup.note=="required"){
                $scope.note = true;
            }else{
                $scope.note = false;
            }
        }
        if(data.user_setup.password=="hidden"){
            $("#password").hide();
        }else{
            if(data.user_setup.password=="required"){
                $scope.password = true;
            }else{
                $scope.password = false;
            }
        }
        if(data.user_setup.phone=="hidden"){
            $("#phone").hide();
        }else{
            if(data.user_setup.phone=="required"){
                $scope.phone = true;
            }else{
                $scope.phone = false;
            }
        }
        if(data.user_setup.username=="hidden"){
            $("#username").hide();
        }else{
            if(data.user_setup.username=="required"){
                $scope.username = true;
            }else{
                $scope.username = false;
            }
        }
        if(data.user_setup.surname=="hidden"){
            $("#surname").hide();
        }else{
            if(data.user_setup.surname=="required"){
                $scope.surname = true;
            }else{
                $scope.surname = false;
            }
        }
        if(data.user_setup.travel_document_number=="hidden"){
            $("#travel_document_number").hide();
        }else{
            if(data.user_setup.travel_document_number=="required"){
                $scope.travel_document_number = true;
            }else{
                $scope.travel_document_number = false;
            }
        }
        if(data.user_setup.vat_pin=="hidden"){
            $("#vat_pin").hide();
        }else{
            if(data.user_setup.vat_pin=="required"){
                $scope.vat_pin = true;
            }else{
                $scope.vat_pin = false;
            }
        }

        // for(var x=0;x<data.user_additional_setup.length;x++){
        //      alert("");
        //     if(data.user_additional_setup[x].option=="optional"){
                
        //         $("#"+data.user_additional_setup[x]._id).prop('required',true);
        //     }
        // }

        });

        $scope.testRequirements = function(option){ 
                if(option =="required"){
                    return true;
                }else{
                    return false;
                }
        }
         
        $scope.getNumber = function (num) {
            return new Array(num);
        }
       
        $scope.register = function () { 


            $.each($('.additional'),function(){ 
                var x=$(this).attr('id');
                $scope.user.reg.user_additional_setup.push({ [x]: $(this).val()});
            }); 
            $scope.user.id=   window.localStorage.getItem("id_conference");
         
            var request = $http({
                method: "post",
                url: 'http://148.251.42.157:3007/register',
                data: $scope.user

 
            });
            request.success(function (data) {  
                if (data.status == 1) {  
                    window.localStorage.setItem("username",$scope.user.reg.username );
                    window.localStorage.setItem("user","1");
                    window.location.reload(); 
                   $location.url('/' + $routeParams.idConference +"/register");
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
