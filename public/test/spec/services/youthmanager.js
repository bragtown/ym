'use strict';

describe('Service: youthmanager', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var youthmanager;
  beforeEach(inject(function (_youthmanager_) {
    youthmanager = _youthmanager_;
  }));

  it('should do something', function () {
    expect(!!youthmanager).toBe(true);
  });

});
