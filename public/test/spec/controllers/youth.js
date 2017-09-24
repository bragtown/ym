'use strict';

describe('Controller: YouthCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var YouthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YouthCtrl = $controller('YouthCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(YouthCtrl.awesomeThings.length).toBe(3);
  });
});
