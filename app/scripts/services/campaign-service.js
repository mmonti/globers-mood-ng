'use strict';

angular.module('globersMoodApp').factory('campaignService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        campaign : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("campaign.get", { id: campaignId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback); // errorCallback || injectedErrorHandler
        },
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
                data: campaign
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