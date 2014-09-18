'use strict';

angular.module('globersMoodApp').factory('projectService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        projects : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("project.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        store : function(project, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("project.store"),
                data: project
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    }
}]);
