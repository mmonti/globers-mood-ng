'use strict';

angular.module('globersMoodApp').controller('preferenceController', function ($scope, preferenceService, $modal) {

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
    preferenceService.preferences(function(data, status, headers, config){
        $scope.preferences = data;
    });

    $scope.open = function(key, value) {
        var modalInstance = $modal.open({
            templateUrl: 'edit-preference.html',
            size: 'sm',
            controller: function ($scope, $modalInstance) {
                $scope.preferenceKey = key;
                $scope.preferenceValue = value;

                $scope.update = function () {
                    $modalInstance.close($scope.preferenceValue);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function(preferenceValue) {
            console.log("Update Preference with value="+preferenceValue)
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };
});


