'use strict';

angular.module('globersMoodApp').factory('statsService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        campaign : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.campaign", { campaignId: campaignId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        datastore : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.datastore.entity"),
                transformResponse: function(data, headersGetter) {
                    if (!data) {
                        return;
                    }
                    return _.filter(JSON.parse(data), function(entity){
                        return !entity.key.name.startsWith("_");
                    });
                }
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        weeklyFeedback : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.weekly")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    };
}]);
