'use strict';

angular.module('globersMoodApp').controller('campaignViewController', [
    '$scope', '$stateParams', '$state', '$timeout', 'campaignService', 'templateService',
    function ($scope, $stateParams, $state, $timeout, campaignService, templateService) {

        $scope.campaignId = $stateParams.id;

        $scope.campaign = {};
        $scope.targets = {};
        $scope.feedbacks = {};
        $scope.template = {};
        $scope.statistics = {};
        $scope.metadata = {};

        // = Load campaign Data
        campaignService.campaign($scope.campaignId, function(data, status, headers, config) {
            $scope.campaign = data;
            $scope.targets = data.targets;
            $scope.feedbacks = data.feedbacks;
            $scope.template = data.template;

            initHeatMapData();
            initTargets();
            initMetadata();
            initFeedbacks();
        });

        // = HeatMap Data.
        var initHeatMapData = function() {
            if ($scope.feedbacks.length === 0) {
                return;
            }

            // = Feedback TimeStamps.
            var timeStamps = {};
            for (var key in _.groupBy($scope.feedbacks, 'created')) {
                timeStamps[Math.round(+new Date(Number(key))/1000)] = 1;
            }
            $scope.heatMapConfig.data = timeStamps;
        };

        // = Feedback HeatMap Config Object.
        $scope.heatMapConfig = {
            start: (3).daysBefore('now'),
            domain: "day",
            subDomain: "hour",
            subDomainTextFormat: "%H",
            range: 7,
            scale: [1, 5, 10, 15],
            cellSize: 20,
            cellPadding: 3,
            cellRadius: 0,
            domainGutter: 10,
            highlight: new Date(),
            cellLabel : {
                empty: "No data on {date}",
                filled: "{count} {name} {connector} {date}"
            },
            colLimit: 4,
            legend: [5, 10, 15, 20, 25],
            legendCellSize: 12,
            legendVerticalPosition: "center",
            legendHorizontalPosition: "right",
            legendOrientation: "vertical",
            onClick: function(date, amount) {
                $scope.$apply(function(){
                    $scope.summary = {
                        date: date,
                        amount: amount
                    };

                    $timeout(function() {
                        $scope.summary = {};
                    }, 5000);
                })
            }
        };

        // = Targets
        // = Mark users from who we receive feedback.
        var initTargets = function() {
            $scope.targets = _.map($scope.targets, function(target) {
                _.each($scope.feedbacks, function(feedback) {
                    if (feedback.user.email === target.email) {
                        angular.extend(target, { feedback: true });
                    }
                });
                return target;
            });
        };

        // = Metadata
        var initMetadata = function() {
            // = Metadata
            templateService.getMetadata($scope.template.id, function (data, status, headers, config) {
                console.debug("Response from=[" + config.url + "] - Method=[" + config.method + "] - Status=[" + status + "]");
                $scope.metadata = data;
            });
        }

        var initFeedbacks = function() {
            var feedbacksAttributes = _.flatten(_.map($scope.feedbacks, function(feedback) {
                return _.map(feedback.attributes, function(attribute) {
                    return angular.extend(attribute, { user : feedback.user });
                });
            }));
            angular.extend($scope.feedbacks, { byKey: _.groupBy(feedbacksAttributes, "key") });
        }
    }
]);
