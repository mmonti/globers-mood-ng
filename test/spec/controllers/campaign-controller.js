'use strict';

describe('Controller: CampaignControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var CampaignControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignControllerCtrl = $controller('CampaignControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
