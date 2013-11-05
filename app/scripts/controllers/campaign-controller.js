'use strict';

angular.module('globersMoodApp').controller('campaignController', function ($scope, _, campaignService, projectService, templateService, userService) {

    var getNewCampaign = function() {
        return {
            overview: {
                name: null,
                description: null
            },
            targets: {
                limitDomain: true,
                destinations: []
            },
            template: {
                selection: null
            },
            scheduling: {
                mode: 'M',
                automatic: {
                    startDate: null,
                    endDate: null
                }
            }
        };
    };

    // == Represents the Campaign to create.
    $scope.campaign = getNewCampaign();

    // == Validate Campaign Model
    $scope.isModelReady = function() {
        if (_.isNull($scope.campaign.overview.name)) {
            console.log("overview - name is null.");
            return false;
        }
        if (_.isEmpty($scope.campaign.targets.destinations)){
            console.log("targets - destinations is empty.");
            return false;
        }
        if (_.isNull($scope.campaign.template.selection)) {
            console.log("template - selection is null.");
            return false;
        }
        if ($scope.campaign.scheduling.mode != 'M'
            && (_.isNull($scope.campaign.scheduling.startDate) || _.isNull($scope.campaign.scheduling.endDate))) {
            console.log("scheduling - mode different of Manual and dates are not set.");
            return false;
        }

        return true;
    }

    // == Targets.
    $scope.targetSource = [{email: "mauro_monti@hotmail.com"},{email: "roberto@mendez.com"},{email: "jose.dominguez@globant.com"}];
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
        var validTargets = _.map(targets.valid, function(target){ return { email: target }; });

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
    $scope.availableTemplates = [
        {id: 0, name: "Template-0", created: new Date()},
        {id: 1, name: "Template-1", created: new Date()},
        {id: 2, name: "Template-2", created: new Date()},
        {id: 3, name: "Template-3", created: new Date()},
        {id: 4, name: "Template-4", created: new Date()}
    ];
    $scope.onTemplateSelected = function(index) {
        $scope.campaign.template.selection = $scope.availableTemplates[index];
    };
    $scope.onTemplateRemoved = function() {
        $scope.campaign.template.selection = null;
    }

    $scope.availableUsers = [];
    $scope.availableProjects = [];
    $scope.selectionProjects = [];


    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

    // = Users
    console.debug("fetching users...")
    var usersSuccessCallback = function(data, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.availableUsers = data;
    };
    userService.unassignedUsers(usersSuccessCallback, errorCallback);

    // = Projects
    console.debug("fetching projects...")
    var projectsSuccessCallback = function(data, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.availableProjects = data;
    };
    projectService.projects(projectsSuccessCallback, errorCallback);

    // = Templates
    console.debug("fetching templates...")
    var templatesSuccessCallback = function(data, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.availableTemplates = data;
    };
    templateService.templates(templatesSuccessCallback, errorCallback);

    // = Projects - Select Widget
    $scope.projectOptions = {
        openOnEnter : true,
        multiple: true,
        simple_tags: true,
        data: function() {
            return {
                text: function(item) { return item.name; },
                results: $scope.availableProjects
            };
        },
        formatResult: function(item) { return item.name; },
        formatSelection: function(item) { return item.name; }
    };

    $scope.projectChange = function(index, available){
        var left = $scope.availableProjects;
        var right = $scope.selectedProjects;
        if (!available) {
            left = $scope.selectedProjects;
            right = $scope.availableProjects;
        }
        right.push(left.splice(index, 1)[0]);
    };

    // = Stores a new campaign
    $scope.submitCampaign = function() {
    };

    // = Reset the form.
    $scope.reset = function() {
        delete $scope.campaign;
        $scope.campaign = getNewCampaign();
    };

});
