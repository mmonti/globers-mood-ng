'use strict';

angular.module('globersMoodApp').controller('campaignCreateController', function ($scope, $location, $modal, $log, _, preferenceService, campaignService, projectService, templateService, userService) {
    var getNewCampaign = function() {
        return {
            overview: {
                name: null,
                description: null,
                expiration: {
                    enabled: false,
                    date: null
                }
            },
            targets: {
                limitDomain: true,
                destinations: []
            },
            template: {
                selection: null
            },
            scheduling: {
                enabled: false,
                date: null
            }
        };
    };

    // == Represents the Campaign to create.
    $scope.campaign = getNewCampaign();

    // == Validate Campaign Model
    $scope.isModelReady = function() {
        if (_.isNull($scope.campaign.overview.name)) {
            $log.debug("overview - name is null.");
            return false;
        }
        if (_.isEmpty($scope.campaign.targets.destinations)){
            $log.debug("targets - destinations is empty.");
            return false;
        }
        if (_.isNull($scope.campaign.template.selection)) {
            $log.debug("template - selection is null.");
            return false;
        }
        if ($scope.campaign.scheduling.enabled
            && (_.isNull($scope.campaign.scheduling.startDate))) {
            $log.debug("scheduling - scheduling enabled and date not set.");
            return false;
        }
        return true;
    }

    // == Targets.
    $scope.targetSource = [];
    var targets = function(targetInput) {
        targetInput = targetInput.trim();
        var targetList = targetInput.split(",");
        if (targetList.length == 0 & targetInput.length > 0) {
            targetList = [targetInput];
        }
        return targetList;
    };
    var sanitizeTargets = function(limitDomain, targetInput) {
        // = Regexp from https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L4
        var EMAIL_REGEXP = (limitDomain) ? /^[A-Za-z0-9._%+-]+@globant.com$/ : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
        var targetList = targets(targetInput);
        var invalidTargets = [];
        var validTargets = _.filter(targetList, function(target){
            var match = target.trim().match(EMAIL_REGEXP);
            if (!match) {
                invalidTargets.push(target);
            }
            return match;
        });
        return {
            valid: validTargets,
            invalid: invalidTargets
        };
    };
    $scope.targetInput = "";
    $scope.onTargetSelected = function() {
        if (_.isUndefined($scope.targetInput) || (!_.isUndefined($scope.targetInput) && _.isEmpty($scope.targetInput.trim()))) {
            return;
        }
        var targets = sanitizeTargets($scope.campaign.targets.limitDomain, $scope.targetInput);
        var validTargets = [];
        _.each(targets.valid, function(email) {
            var targetUser =_.where($scope.targetSource, {email: email});
            if (!_.isUndefined(targetUser)) {
                validTargets.push((_.isArray(targetUser) && targetUser.length > 0) ? targetUser[0] : { email: email, name: email });
            }
        });
        $scope.campaign.targets.destinations = _.union($scope.campaign.targets.destinations, validTargets);
        $scope.targetSource = _.difference($scope.targetSource, $scope.campaign.targets.destinations);
        $scope.targetInput = "";
    };
    $scope.onDiscardTarget = function(index) {
        var target = $scope.campaign.targets.destinations.splice(index, 1);
        $scope.targetSource.push(target[0]);
    };
    $scope.onDiscardAll = function() {
        $scope.targetSource = _.union($scope.targetSource, $scope.campaign.targets.destinations);
        $scope.campaign.targets.destinations = [];
    };

    // == Templates.
    $scope.availableTemplates = [];
    $scope.onTemplateSelected = function(index) {
        $scope.onTemplateRemoved();
        $scope.availableTemplates[index].selected = true;
        $scope.campaign.template.selection = $scope.availableTemplates[index];
    };
    $scope.isTemplateSelected = function(index) {
        return (_.isUndefined($scope.availableTemplates[index].selected) ? false : $scope.availableTemplates[index].selected);
    };
    $scope.onTemplateRemoved = function() {
        _.each($scope.availableTemplates, function(template) { template.selected = false; });
        $scope.campaign.template.selection = null;
    };
    $scope.onTemplatePreviewOpen = function () {
        var templatePreviewModal = $modal.open({
            templateUrl: '/tpl/template-preview.html',
            controller: function($scope, $modalInstance, template) {
                $scope.template = template;
                $scope.onTemplatePreviewClose = function () {
                    templatePreviewModal.dismiss('cancel');
                };
            },
            resolve: {
                template: function () {
                    return $scope.campaign.template.selection;
                }
            },
            windowClass: "template-preview"
        });
        // == Handler
        templatePreviewModal.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.debug("dismiss");
        });
    };

    // == Users
    $log.info("fetching users...")
    userService.users(function(data, status, headers, config) {
        $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.targetSource = data.content;
    });

    // == Templates
    $log.info("fetching templates...")
    templateService.templates(function(data, status, headers, config) {
        $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.availableTemplates = data.content;
    });

    // == Stores a new campaign
    $scope.submitCampaign = function() {
        campaignService.store($scope.campaign, function(data, status, headers, config) {
            $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $location.path("/");
        });
    };

    // == Reset the form.
    $scope.reset = function() {
        delete $scope.campaign;
        $scope.campaign = getNewCampaign();
    };

});
