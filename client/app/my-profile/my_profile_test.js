'use strict';

describe('myApp.my-profile module', function() {

  beforeEach(module('myApp.my-profile'));

  describe('my-profile controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var my-profileCtrl = $controller('MyProfileCtrl');
      expect(MyProfileCtrl).toBeDefined();
    }));

  });
});