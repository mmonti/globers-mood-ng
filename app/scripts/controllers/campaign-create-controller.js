'use strict';

angular.module('globersMoodApp').controller('campaignCreateController', function ($scope, $location, $modal, _, preferenceService, campaignService, projectService, templateService, userService) {

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };


    $scope.clearExpiringDate = function () {
        $scope.campaign.overview.expiration.date = null;
    };

    $scope.clearSchedulingDate = function () {
        $scope.campaign.scheduling.expiration.date = null;
    };

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
            console.debug("overview - name is null.");
            return false;
        }
        if (_.isEmpty($scope.campaign.targets.destinations)){
            console.debug("targets - destinations is empty.");
            return false;
        }
        if (_.isNull($scope.campaign.template.selection)) {
            console.debug("template - selection is null.");
            return false;
        }
        if ($scope.campaign.scheduling.enabled
            && (_.isNull($scope.campaign.scheduling.startDate))) {
            console.debug("scheduling - scheduling enabled and date not set.");
            return false;
        }
        return true;
    }

    // == Targets.
    $scope.targets = { input: "", source : [] };

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

    $scope.onTargetSelected = function() {
        if (_.isUndefined($scope.targets.input) || (!_.isUndefined($scope.targets.input) && _.isEmpty($scope.targets.input.trim()))) {
            return;
        }
        var targets = sanitizeTargets($scope.campaign.targets.limitDomain, $scope.targets.input);
        var validTargets = [];
        _.each(targets.valid, function(email) {
            var targetUser =_.where($scope.targets.source, {email: email});
            if (!_.isUndefined(targetUser)) {
                validTargets.push((_.isArray(targetUser) && targetUser.length > 0) ? targetUser[0] : { email: email, name: email });
            }
        });
        $scope.campaign.targets.destinations = _.union($scope.campaign.targets.destinations, validTargets);
        $scope.targets.source = _.difference($scope.targets.source, $scope.campaign.targets.destinations);
        $scope.targets.input = "";
    };
    $scope.onDiscardTarget = function(index) {
        var target = $scope.campaign.targets.destinations.splice(index, 1);
        $scope.targets.source.push(target[0]);
    };
    $scope.onDiscardAll = function() {
        $scope.targets.source = _.union($scope.targets.source, $scope.campaign.targets.destinations);
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
            size: 'lg',
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
            console.debug("dismiss");
        });
    };

    // == Users
    console.info("fetching users...")
    userService.users(function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.targets.source = data.content;
    });

    // == Templates
    console.info("fetching templates...")
    templateService.templates(function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.availableTemplates = data.content;
    });

    // == Stores a new campaign
    $scope.submitCampaign = function() {
        campaignService.store($scope.campaign, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $location.path("/");
        });
    };

    // == Reset the form.
    $scope.reset = function() {
        delete $scope.campaign;
        $scope.campaign = getNewCampaign();
    };

});