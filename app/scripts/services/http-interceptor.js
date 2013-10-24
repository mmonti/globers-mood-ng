'use strict';

angular.module('globersMoodApp').factory('httpInterceptor', function ($q, $rootScope) {

    return {
        request: function (config) {
//            if (!$rootScope.synch) {
//                $rootScope.showOutOfSynchNotification();
//            }
            return $q.when(config);
        }
    };

});
