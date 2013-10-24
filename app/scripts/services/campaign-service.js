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
                data: campaign,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    };
});