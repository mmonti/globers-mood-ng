'use strict';

angular.module('globersMoodApp').factory('feedbackService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        feedbackOfCampaign : function(campaignId, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("feedback.campaign", {campaignId: campaignId})
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    }
}]);
