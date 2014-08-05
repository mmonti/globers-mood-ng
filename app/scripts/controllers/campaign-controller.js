'use strict';

angular.module('globersMoodApp').controller('campaignController', [ '$scope', '$stateParams', '$interval', 'pagination', 'preferenceService', 'campaignService', function ($scope, $stateParams, $interval, pagination, preferenceService, campaignService) {
    $scope.campaignId = $stateParams.id;
    campaignService.campaign($stateParams.id, function(data, status, headers, config) {
        $scope.campaign = data;
    });
}]);
