'use strict';

angular.module('globersMoodApp').controller('campaignViewTargetsController', [
    '$scope', '$stateParams', 'campaignService', 'dispatchService',
    function ($scope, $stateParams, campaignService, dispatchService) {

        // = Response Rate
        $scope.responseRate = function() {
            return ($scope.campaign.feedbackNumber / $scope.targets.length) * 100;
        };

        // = Remind
        $scope.onResend = {
            proceed: function(dialog, index, campaignId, target) {
                dispatchService.remind(campaignId, target.id, function(data, status, headers, config) {
                    console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                    dialog.close();
                })
            }
        };

        // = Remove
        $scope.onRemove = {
            proceed: function(dialog, index, campaignId, target) {
            }
        };
    }
]);
