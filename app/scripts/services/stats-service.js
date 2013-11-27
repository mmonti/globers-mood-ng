'use strict';

angular.module('globersMoodApp').factory('statsService', function($http, logger, configuration) {
    return {
        mostActiveCampaigns : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("stats.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    };
});
