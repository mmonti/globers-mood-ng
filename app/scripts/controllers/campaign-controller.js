'use strict';

angular.module('globersMoodApp').controller('campaignController', [ '$scope', '$stateParams', '$interval', 'pagination', 'preferenceService', 'campaignService', function ($scope, $stateParams, $interval, pagination, preferenceService, campaignService) {

    $scope.campaignId = $stateParams.id;
    campaignService.campaign($stateParams.id, function(data, status, headers, config) {
        data.targets = _.map(data.targets, function(target) {
            _.each(data.feedbacks, function(feedback) {
                if (feedback.user.email === target.email) {
                    angular.extend(target, { feedback: true });
                }
            });
            return target;
        });

        if (data.feedbacks.length > 0) {
            var attributes = [];
            _.each(data.feedbacks[0].attributes, function(attribute) {
                attributes.push(attribute.key);
            });
            angular.extend(data, {
                feedback : {
                    labels : attributes
                }
            });
        }
        $scope.campaign = data;
    });
}]);
