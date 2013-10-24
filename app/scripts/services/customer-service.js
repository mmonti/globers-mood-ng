'use strict';

angular.module('globersMoodApp').factory('customerService', function($http, configuration) {
    return {
        customers : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("customer.list")
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    }
});
