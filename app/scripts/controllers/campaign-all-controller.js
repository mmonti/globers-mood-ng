'use strict';

angular.module('globersMoodApp').controller('campaignAllController', [ '$scope', 'pagination', 'preferenceService', 'campaignService', function ($scope, pagination, preferenceService, campaignService) {
    $scope.campaigns = [];

    preferenceService.$ns("campaign.all").then(function(settings){
        $scope.pagination = pagination.init({ size: settings.campaign.all.items.size });
        fetchCampaigns();
    });

    // = Watch for page change
    $scope.$watch("pagination.selectedPage", function(selectedPage, oldPage) {
        if (angular.isUndefined($scope.pagination)) {
            return;
        }
        var pageRequest = $scope.pagination.getPageRequest(selectedPage);
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    });

    // == Update the data with the response.
    var campaignSuccessCallback = function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.campaigns = $scope.pagination.update(data);
    };

    // == Fetch data set.
    var fetchCampaigns = function() {
        var pageRequest = $scope.pagination.getPageRequest();
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    }

    campaignService.campaigns(null, function(data, status, headers, config) {
        $scope.campaigns = data.content;
    });
}]);
