'use strict';

angular.module('myApp.my-profile', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/my-profile', {
            templateUrl: 'my-profile/my-profile.html',
            controller: 'MyProfileCtrl'
        });
    }])

    .controller('MyProfileCtrl', function ($scope, $http) {
        $scope.fili = { "username": "filip" };
        $scope.getNumber = function (num) {
            return new Array(num);
        }
        $scope.user = {
            name: "",
            surname: "",
            username: "",
            password: "",
            passwor2: "",
            email: "",
            address: "",
            companyinfo: "",
            inputfilepreview: "",
            rememeberlogin: ""
        }

        /* Get row from register where id = sesion user id --> show result in inputs */
        var request = $http({
            method: "GET",
            url: 'http://localhost:3000/register',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        
          });
          request.success(function (data) {
            $scope.menu = data;
            console.log(data);
        
          });


        /* btn save form - update row in register table where user id = sesion user id */
        $scope.save = function () {
            var request = $http({
                method: "post",
                url: 'http://localhost:3000/register',
                data: $scope.user

            });
            request.success(function (data) {
                console.log(data);
                if (data.status == 1) {
                    alert("Uspjesno ste ažurirali izmjene");
                } else {
                    alert("Neuspješno ažuriranje izmjena");
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