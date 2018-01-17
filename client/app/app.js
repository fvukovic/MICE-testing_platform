'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngSanitize',
  'ngRoute',
  'ngMap',
  'myApp.home',
  'myApp.register',
  'myApp.registration',
  'myApp.my-profile',
  'myApp.events',
  'myApp.abstracts',
  'myApp.conference-info',
  'myApp.menu',
  'myApp.view2',
  'myApp.indeks',
  'myApp.version',
  'pascalprecht.translate',
  'ngSanitize'
]); 
app.value('api', 'http://148.251.42.157:3007');
app.value('url', '/mice/#/');

 
    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
   

        $routeProvider
            .when('/:idConference', {
                templateUrl: 'menu/empty.html',
                controller: 'RouteController'
            })
            .when('/hello', {
                templateUrl: 'hello.html',
                controller: 'HelloController'
            })

            .when('/:idConference/:address', {
                templateUrl: 'indeks/indeks.html',
                controller: 'NextRouteController'
            })
             

    }]);
app.controller('HelloController', function($scope) {
    console.log('Hello controller says: "Hello :)"');
});

app.controller('NextRouteController', function (api,NgMap,$scope,$rootScope, $routeParams, $http, $location,$translate,$sce) { 
  $scope.html="";
  var pageExist=false;  
  $rootScope.$on('$translateChangeSuccess', function (event, current, previous) {
window.location.reload();
  });

 
  function getLatitudeLongitude( address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results[0].geometry.location.lat());
                $scope.lat = results[0].geometry.location.lat();
                $scope.long = results[0].geometry.location.lng();
            }
        });
    }
} 



  var request = $http({
    method: "POST",
    url: this.api+'/menu',
    data: { conference_name: $routeParams.idConference },

  });
  request.success(function (data) {
    if(data.status==0){
      return;
    } 
    getLatitudeLongitude(data.conference.location.address.street + ", "+data.conference.location.address.city)

 

    $scope.trustedHtml = function () { 
      
         return   $sce.trustAsHtml($scope.html); 
       
    } 
  
 
    window.localStorage.setItem("conference", $routeParams.idConference); 
    for(var x=0;x<data.menu.length;x++){ 
      console.log(data.menu[x].address+ "=="+$routeParams.address);
      if(data.menu[x].address==$routeParams.address){  
         $scope.html= $sce.trustAsHtml( data.menu[x].html[$translate.use()])  ;
         if(data.menu[x].type=="main"){
           $scope.main = true;
         }
         pageExist=true; 
      }
      for(var y=0;y<data.menu[x].nodes.length;y++){
         if(data.menu[x].nodes[y].address==$routeParams.address){ 
           $scope.html=   $sce.trustAsHtml( data.menu[x].nodes[y].html[$translate.use()]);  ;
         }
      }
    }
    if($routeParams.address=="_" && pageExist==false){
      if(data.menu[0].type=="main"){
        $scope.main = true;
      }
      $scope.html=data.menu[0].html;
      
      $scope.html = $sce.trustAsHtml( data.menu[0].html[$translate.use()]);  ;
      console.log("pocetna");
    }

  });

  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

});

app.controller('RouteController', function (api,$scope, $routeParams, $http, $location) {
  
 
  console.log("RputeController");
  var request = $http({
    method: "POST",
    url: api+'/menu',
    data: { conference_name: $routeParams.idConference },

  });
  request.success(function (data) {
    console.log(data);
    if(data.status==0){
      return;
    } 
    window.localStorage.setItem("conference", $routeParams.idConference) 
    if(data.menu[0].address=="/"){
      $location.url('/' + $routeParams.idConference +"/"+ data.menu[0].address+"_");
    }else{  
      $location.url('/' + $routeParams.idConference +"/"+ data.menu[0].address);
    }
    
  });

});


app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'HAVE_ACC': 'Already have an account',
    'LOGIN': 'Login',
    'DOWN_LINK': "You can download mobile app via link",
    'MOBILE': 'Mobile application',
    'DOWNLOAD': "Download",
    'COM_INFO': "Company info",
    'NAME_COM': "Name of Company",
    'ADDRESS': "Address",
    'PHONE': "Phone",
    //meni
    'CONF_NAME': "Conference name",
    "MAIN": "MAIN INFO",
    "CONF_INF": "Conference info",
    "LOC_HIS": "Location history",
    "WEL_SPEC": "Welcome speech",
    "REG_INFO": "REGITRATION INFO ",
    "PRO_SER": "Products/Services registration",
    "ABSTRACT": "ABSTRACT",
    "LECTURES": "LECTURES",
    "PRACTICAL": "PRACTICAL INFO",
    "FORGET": "Forget the password",
    "SIGN": "Sign in",
    "REGISTER": "Register",
    "ACCO": "Accomodation",
    "HOW": "How to get there",
    "SHOPPING": "Shopping",
    "DINNING": "Fine dining",
    "KEEP": "keep me logged-in",
    "NEW": "New here",
    "LOGOUT": "Log out",


    //ABSTRACT

    'WORD': "Look at the summary in the form that is being received (Word document) and replace the wrongly displayed characters with another, identical. If the error persists, contact us at the following email address:",
    "TEXT": "Abstract text ",
    "NUMBER": "Number of Characters:",
    "KEY": "Keyword",
    "35KEY": "(3-5 keyword splited with ,)",

    "TITLESA": "Abstract title",

    "SAZETAK": "ABSTRACT",
    "AUTHORI": "This is the author of the exhibitor",

    "CHOOSEIN": "- - - CHOOSE INSTITUTION - - -",
    "CHOSEPRE": "- - SELECT THE PRESENTATION THEME - -",
    "UCANCHOOSE": " You can also assign more than one (click the first institution and click CTRL + click on the others",
    "SET": "Assign the author to the institution",

    "CHOOSEDI": " Selected institutions",
    "NAMESURNAME": "Name and surname",
    "AUTHOR": "AUTHOR",

    "CHOOSEA": "Determine the number of authors",
    "AUTORSA": "ABSTRAC AUTHOR",
    "WRITEIN": "Enter the institution of the author according to the following example: Institution Name, Address, Postal Code City, Country",
    "NPR": " ex.",

    "LISTIN": " LIST INSTITUTION",
    "PHONEAU": " Contact phone contact",
    "EMAILAU": " Email contact of the author",
    "NAMEAUTO": " Name and surname contact author",

    "THEME": "THEME OF PRESENTATION",

    "POSTER": "Poster presentation",
    "ORAL": " Oral presentation",
    "TYPE": "TYPE OF PRESENTATION",
    "ONLINE": "In the event of any difficulties or inability to submit online submissions, please contact us at Email",
    "SAZIZVAN": " Summaries received outside of these instructions will not be considered valid",
    "DIRECTIONS": " instructions for sending summaries",
    "VIEW": "SUMMARY OF THE SUMMARY OF THE WORD DOCUMENT",
    "VIEW2": "I LOOKED AT THE DATA I HAD AND I WANTED TO SUBMIT AN ABSTRACT",
    "ADD": "ADD TO INSTITUTE ON THE LIST",
    "PLSLAT": " Please use Latin characters. If you do not, please see the summary log instructions here:",
    "NAMEINST": "Enter the name of the institution in the example above and add it to the list. Maximum 20 institutions.",
    "REQUIRED": "Required!",

    "IMPORTANT": " IMPORTANT",


    //PRODUCST/SERVICE

    "ORDER": "Order",
    "SENDEM": "Send offer via E-mail",
    "SUBTOTAL": "Subtotal",
    "TAX": "TAX",
    "TOTAl": "Total",
    "CARTT": "Cart Totals ",
    "TICKET": "ticket",
    "NAME": "Name",
    "SURNAME": "Surname",
    "EMAIL": "Email",
    "STANDARD": "Standard ticket",
    "ADOTO": "Add to order",
    "QUANTI": "Quantity",
    "LEFT": "Left",
    "PRICE": "Price",
    "PRODUCTST": "Products and Services registration",


    //LECTURES

    "SELECTEDL": "Selected lecture from calendar",
    "LECINFO": "Lecturer info",


    //registration
    "address_city": "Town",
    "address_country_id": "Country ID",
    "address_postal": "Postal number",
    "address_street": "Street",
    "company_address_city": "Company - Town",
    "company_address_country_id": "Company - Country ID",
    "company_address_postal": "Company - Postal number",
    "company_address_street": "Company - Street",
    "company_name": "Name of the company",
    "company_vat_no": "Company VAT number",
    "date_of_birth": "Date of birth",
    "email": "E-mail",
    "gender": "Gender",
    "gender_male": "Male",
    "gender_female": "Female",
    "mobile": "Cellphone number",
    "note": "Note",
    "password": "Password",
    "password2": "Repeat the password",
    "phone": "Phone number",
    "surname": "Surname",
    "travel_document_number": "Travel document number",
    "username": "Username",
    "vat_pin": "VAT pin",

    "PICTURE": "Picture",
    "CLEAR": "Clear",
    "BROWSE": "Browse",
    "REMEMBER": "Remember",
    "REGISTER": "Register",
    "USERNAME": "Username",
    "PASSWORD": "Password",

    //My profile
    "MYPROFILE": "My Profile",
    "SAVE": "Save changes",
    "PASSWORDREPEAT": "Repeat the password",

    //Footer
    "GET": "Get in Touch",
    "NEWS": "Newsletter",
    "KEEPOUR": "Keep up on our always evolving product features and technology. Enter your e-mail and subscribe to our newsletter",
    "SUCCESS": "Success",
    "ADDEDEM": "You've been added to our email list.",
    "LATEST": "Latest Tweets",
    "WAIT": "Please wait...",
    "FOLLOW": " Follow Us",



  });

  $translateProvider.translations('hr', {
    'HAVE_ACC': 'Već imaš račun',
    'LOGIN': 'Prijavi se',
    'DOWN_LINK': " Možete skinuti mobilnu aplikaciju na sljedecem linku ",
    'MOBILE': 'Mobilna aplikacija',
    'DOWNLOAD': "Preuzmi",
    'COM_INFO': "Informacije o kompaniji",
    'NAME_COM': "Ime kompanije",
    'ADDRESS': "Adresa",
    'PHONE': "Telefon",

    //meni
    'CONF_NAME': "Naziv konferencije",
    "MAIN": "GLAVNI INFO",
    "CONF_INF": "Info konferencije",
    "LOC_HIS": "Povijest lokacija",
    "WEL_SPEC": "Govor dobrodošlice",
    "REG_INFO": "REGISTRACIJA INFO ",
    "PRO_SER": "Proizvodi/Servisi registracija",
    "ABSTRACT": "SAŽETAK ",
    "LECTURES": "DOGAĐANJA",
    "PRACTICAL": "PRAKIČNO INFO",
    "FORGET": "Zaboravili lozinku",
    "SIGN": "Prijavi se",
    "REGISTER": "Registiraj se",
    "ACCO": "Prijedlog",
    "HOW": "Kako doći do tamo",
    "SHOPPING": "Šoping",
    "DINNING": "Fina jela",
    "KEEP": "Ostani prijavljen",
    "NEW": "Novi ovdje",
    "LOGOUT": "Odjava",

    //ABSTRACT

    'WORD': "Vas, pregledajte sažetak u obliku koji se zaprima (Word dokument) te ako je potrebno zamijenite krivo prikazane znakove drugim, istoznačnim. Ako se greška nastavlja, kontaktirajte nas na sljedeću email adresu:",
    "TEXT": "Tekst sažetka ",
    "NUMBER": "Broj znakova:",
    "KEY": "Ključne riječi",
    "35KEY": "(3-5 ključnih riječi odvojenih zarezom)",

    "TITLESA": "Naslov sažetka",

    "SAZETAK": "SAŽETAK”",
    "AUTHORI": "Ovo je autor izlagač",

    "CHOOSEIN": "- - - ODABERITE INSTITUCIJU - - -",
    "CHOSEPRE": "- - ODABERITE TEMU PREZENTACIJE - -",

    "UCANCHOOSE": " Možete dodijeliti i više njih (kliknite prvu instituciju te CTRL + klik mišem na ostale",
    "SET": " Dodijelite autoru instituciju",

    "CHOOSEDI": " Odabrane institucije",
    "NAMESURNAME": "Ime i prezime",
    "AUTHOR": "AUTOR",

    "CHOOSEA": "Odredite broj autora",
    "AUTORSA": "AUTORI SAŽETAKA",
    "WRITEIN": "Upišite institucije autora prema sljedećem primjeru: Naziv institucije, Adresa, Poštanski broj Grad, Država",
    "NPR": " npr.",

    "LISTIN": " LISTA INSTITUCIJA",
    "PHONEAU": " Telefon kontakt autor",
    "EMAILAU": " Email kontakt autora",
    "NAMEAUTO": " Ime i prezime kontakt autor",

    "THEME": "TEMA PREZENTACIJE",

    "POSTER": "Poster prezentacija",
    "ORAL": " Oralna prezentacija",
    "TYPE": "VRSTA PREZENTACIJA",
    "ONLINE": "U slučaju bilo kakvih poteškoća i nemogućnosti online prijave sažetaka, kontaktirajte nas na Email",
    "SAZIZVAN": " Sažeci zaprimljeni izvan navedenih uputa neće se smatrati valjanim",
    "DIRECTIONS": " upute za slanje sažetaka",
    "NAMEINST": "Upišite naziv institucije po gornjem primjeru te je dodajte na listu. Maksimalno 20 institucija.",
    "REQUIRED": "Obavezno!",
    "PLSLAT": " Molimo koristite latinična slova. Ukoliko niste, upute za prijavu sažetaka pogledajte ovdje:",
    "VIEW": "PREGLED SAŽETKA U OBLIKU KOJI SE ZAPRIMA (WORD DOKUMENT)",
    "VIEW2": "PREGLEDAO SAM UPISANE PODATKE I ŽELIM PRIJAVITI SAŽETAK",
    "ADD": " DODAJ INSTITUCIJU NA LISTU",
    "IMPORTANT": " VAŽNO",


    //PRODUCST/SERVICE

    "ORDER": "Narudžba",
    "SENDEM": "Poslati ponudu preko E-mail",
    "SUBTOTAL": "Ukupna suma",
    "TAX": "POREZ",
    "TOTAl": "Ukupno",
    "CARTT": "Košarica ukupno ",
    "TICKET": "Karta",
    "NAME": "Ime",
    "SURNAME": "Prezime",
    "EMAIL": "Email",
    "STANDARD": "Standard karte",
    "ADOTO": "Dodaj u narudžbu",
    "QUANTI": "Količina",
    "LEFT": "Ostalo",
    "PRICE": "Cijena",
    "PRODUCTST": "Registracija proizvoda i servisa",



    //LECTURES

    "SELECTEDL": "Odabrano predavanje iz kalendara",
    "LECINFO": "Informacije o predavaču",

    //registration to services
    "address_city": "Grad",
    "address_country_id": "Oznaka države",
    "address_postal": "Poštanski broj",
    "address_street": "Ulica",
    "company_address_city": "Tvrtka - Grad",
    "company_address_country_id": "Tvrtka - Oznaka države",
    "company_address_postal": "Tvrtka - Poštanski broj",
    "company_address_street": "Tvrtka - Ulica",
    "company_name": "Naziv tvrtke",
    "company_vat_no": "Tvrtka - VAT broj",
    "date_of_birth": "Datum rođenja",
    "email": "E-mail",
    "gender": "Spol",
    "gender_male": "Muško",
    "gender_female": "Žensko",
    "mobile": "Mobilni telefon",
    "note": "Bilješka",
    "password": "Lozinka",
    "password2": "Ponovite lozinku",
    "phone": "Telefonski broj",
    "surname": "Prezime",
    "travel_document_number": "Broj putne knjižice",
    "username": "Korisničko ime",
    "vat_pin": "VAT pin",

    "PICTURE": "Picture",
    "CLEAR": "Clear",
    "BROWSE": "Browse",
    "REMEMBER": "Remember",
    "REGISTER": "Register",
    "USERNAME": "Username",
    "PASSWORD": "Password",
    "PASSWORDREPEAT": "Repeat the password",

 
    "PICTURE": "Fotografija",
    "CLEAR": "Očisti",
    "BROWSE": "Pretraži",
    "REMEMBER": "Zapamti",
    "REGISTER": "Registriraj",
    "USERNAME": "Korisničko ime",
    "PASSWORD": "Lozinka",
    "PASSWORDREPEAT": "Ponovite lozinku",

    //My profile
    "MYPROFILE": "Moj profil",
    "SAVE": "Spremi promjene",
    "PASSWORDREPEAT": "Ponovite lozinku",

    //Footer
    "GET": "Kontaktirajte nas",
    "NEWS": "Novinska brošura",
    "KEEPOUR": "Uvijek se razvijaju značajke i tehnologija proizvoda. Unesite svoju e-poštu i pretplatite se na naš newsletter",
    "SUCCESS": "Uspješno",
    "ADDEDEM": "Dodani ste na našu email listu",
    "LATEST": "Najnoviji Tweets",
    "WAIT": "Molim Vas pričekajte...",
    "FOLLOW": " Pratite nas",










  });

  $translateProvider.preferredLanguage(window.localStorage.getItem("language"));
}]);

