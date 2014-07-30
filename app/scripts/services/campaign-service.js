'use strict';

angular.module('globersMoodApp').factory('campaignService', ['$http', 'logger', 'configuration', function($http, logger, configuration) {
    return {
        campaigns : function(pageable, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("campaign.list"),
                params: pageable
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback); // errorCallback || injectedErrorHandler
        },
        store : function(campaign, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("campaign.store"),
                data: {
                    name: campaign.overview.name,
                    description: campaign.overview.description,
                    startDate: (campaign.scheduling.enabled) ? Date.create(campaign.scheduling.date).iso() : null,
                    endDate: (campaign.overview.expiration.enabled) ? Date.create(campaign.overview.expiration.date).iso() : null,
                    template: {
                        id: campaign.template.selection.id //,
//                        name: campaign.template.selection.name,
//                        description: campaign.template.selection.description,
//                        file: campaign.template.selection.template
                    },
                    targets: campaign.targets.destinations
                }
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        start : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("campaign.start", { id: campaignId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        close : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("campaign.close", { id: campaignId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }

    };
}]);