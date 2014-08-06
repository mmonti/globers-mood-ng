'use strict';

angular.module('globersMoodApp').controller('campaignAllController',
    [ '$scope', '$interval', 'pagination', 'preferenceService', 'campaignService',
        function ($scope, $interval, pagination, preferenceService, campaignService) {

    preferenceService.$ns("campaign.all").then(function(settings){
        $scope.pagination = pagination.init({ size: settings.campaign.all.items.size });
        fetchCampaigns();
        $interval(fetchCampaigns, settings.campaign.all.refresh.time);
    });

    // == Update the data with the response.
    var campaignSuccessCallback = function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.campaigns = $scope.pagination.update(data);
    };

    // == Fetch Campaigns.
    var fetchCampaigns = function() {
        var pageRequest = $scope.pagination.getPageRequest();
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    }

    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    $scope.onCampaignStopClose = function(campaignId) {
        campaignService.close(campaignId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    $scope.onCampaignRemove = function(modal, campaignId) {
        console.debug("Removing campaign=["+campaignId+"]");
        modal.close();
    };

    // = Watch for page change
    $scope.$watch("pagination.page.number", function(selectedPage, oldPage) {
        if (angular.isUndefined($scope.pagination)) {
            return;
        }
        var pageRequest = $scope.pagination.getPageRequest(selectedPage);
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    });

}]);
