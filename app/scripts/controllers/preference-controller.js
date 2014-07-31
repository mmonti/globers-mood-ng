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
    var fetchPreferences = function() {
        preferenceService.preferences(function(data, status, headers, config){
            $scope.preferences = data;
        });
    };
    fetchPreferences();

    $scope.open = function (key, value) {
        $scope.preference = {
            key: key,
            value: value
        };

        var modalInstance = $modal.open({
            templateUrl: '/tpl/preference-modal.html',
            controller: modalController,
            resolve: {
                preference: function () {
                    return $scope.preference;
                }
            }
        });

        modalInstance.result.then(function(preference) {
            preferenceService.updatePreference(preference.key, preference.value, fetchPreferences);
        }, function () {
            console.info('update preference canceled');
        });
    };

    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.
    var modalController = function ($scope, $modalInstance, preference) {
        $scope.preference = preference;
        $scope.update = function () {
            $modalInstance.close({ key: preference.key, value: $scope.preference.value });
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
}]);


