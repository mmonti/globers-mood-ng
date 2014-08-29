'use strict';

angular.module('globersMoodApp').controller('preferenceController', ['$scope', 'preferenceService', '$modal', function ($scope, preferenceService, $modal) {

    var senderAliasKey = "sender.alias";
    var senderMailKey = "sender.mail";

    $scope.senderAlias = "Administrator";
    $scope.senderMail = "admin@globant.com";

    // = Load Sender Alias
    preferenceService.preference(senderAliasKey, function(data, status, headers, config) {
        $scope.senderAlias = data;
    });

    // = Load Sender Mail
    preferenceService.preference(senderMailKey, function(data, status, headers, config) {
        $scope.senderMail = data;
    });

    // = Apply updates
    $scope.applyPreferences = function() {
        // = Mail
        preferenceService.updatePreference(senderAliasKey, $scope.senderAlias);
        preferenceService.updatePreference(senderMailKey, $scope.senderMail);
    }

    $scope.preferences = [];
    $scope.fetchPreferences = function() {
        preferenceService.preferences(function(data, status, headers, config){
            $scope.preferences = data;
        });
    };
    $scope.fetchPreferences();


}]);


