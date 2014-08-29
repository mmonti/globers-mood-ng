'use strict';

angular.module('globersMoodApp').controller('preferenceUpdateController', [
    '$scope', 'preferenceService',
    function ($scope, preferenceService) {

        $scope.onPreferenceUpdate = function() {
            preferenceService.updatePreference($scope.preferenceKey, $scope.preferenceValue, $scope.ref.fetchPreferences);
            $scope.close();
        }
    }
]);