'use strict';

angular.module('globersMoodApp').factory('templateService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        templates : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("template.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        setMetadata : function(templateId, metadata, successCallback, errorCallback) {
            var request = $http({
                method : 'PUT',
                url : configuration.getServiceEndpoint("template.set.metadata", { templateId: templateId }),
                data: metadata
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        analyze : function(templateId, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("template.analyze", { templateId: templateId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback); // errorCallback || injectedErrorHandler
        },
        delete : function(templateId, successCallback, errorCallback) {
            var request = $http({
                method : 'DELETE',
                url : configuration.getServiceEndpoint("template.delete", { templateId: templateId })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback); // errorCallback || injectedErrorHandler
        }
    }
}]);
