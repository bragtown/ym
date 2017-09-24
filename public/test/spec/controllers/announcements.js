'use strict';

describe('Controller: AnnouncementsCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var AnnouncementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnnouncementsCtrl = $controller('AnnouncementsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AnnouncementsCtrl.awesomeThings.length).toBe(3);
  });
});
