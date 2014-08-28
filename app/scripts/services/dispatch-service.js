'use strict';

angular.module('globersMoodApp').factory('dispatchService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        remind : function(campaignId, userId, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("dispatch.remind", { campaignId: campaignId, userId: userId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    }
}]);
