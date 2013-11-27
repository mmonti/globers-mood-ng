'use strict';

angular.module('globersMoodApp').factory('userService', function($http, logger, configuration) {
    return {
        users : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("user.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        assignedUsers : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("user.assigned")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        unassignedUsers : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("user.unassigned")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    }
});
