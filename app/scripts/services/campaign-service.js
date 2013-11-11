'use strict';

angular.module('globersMoodApp').factory('campaignService', function($http, configuration) {
    return {
        campaigns : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("campaign.list")
            });
            request.success(successCallback);
            request.error(errorCallback); // errorCallback || injectedErrorHandler
        },
        store : function(campaign, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("campaign.store"),
                data: {
                    name: campaign.overview.name,
                    description: campaign.overview.description,
                    startDate: (campaign.scheduling.mode == 'A') ? campaign.scheduling.date : null,
                    endDate: (campaign.overview.expiration.enabled) ? campaign.overview.expiration.date : null,
                    template: {
                        id: campaign.template.selection.id,
                        name: campaign.template.selection.name,
                        description: campaign.template.selection.description,
                        file: campaign.template.selection.template
                    },
                    targets: campaign.targets.destinations
                }
            });
            request.success(successCallback);
            request.error(errorCallback);
        },
        start : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("campaign.start", { id: campaignId })
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    };
});