'use strict';

angular.module('globersMoodApp').factory('statsService', ['$http', 'logger', 'configuration', function($http, logger, configuration) {
    return {
        mostActiveCampaigns : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },

        metadata : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.metadata"),
                transformResponse: function(data, headersGetter) {
                    return _.filter(JSON.parse(data), function(entity){
                        return !entity.key.name.startsWith("_");
                    });
                }
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    };
}]);
