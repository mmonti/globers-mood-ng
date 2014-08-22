'use strict';

angular.module('globersMoodApp').controller('campaignCreateController', ['$scope', '$location', '$modal', '_', 'preferenceService', 'campaignService', 'projectService', 'templateService', 'userService', function($scope, $location, $modal, _, preferenceService, campaignService, projectService, templateService, userService) {

    $scope.tabs = [{active:true},{active:false},{active:false},{active:false},{active:false}];

    var getNewCampaign = function() {
        var reference = {
            basic: {
                name: null,
                description: null,
                frequencyIsOpen : false,
                frequencies: ["Once", "Daily", "Weekly", "Monthly", "Yearly"],
                frequency: "ONCE",
                isRecursive: function() {
                    return reference.basic.frequency != "ONCE";
                }
            },
            targets: {
                limitDomain: true,
                destinations: []
            },
            template: {
                selection: null,
                fileIsOpen: true
            },
            scheduling: {
                enabled: false,
                dateIsOpen : false,
                minDate: new Date(),
                date: null,
                timeIsOpen : false,
                time: null,
                expiration: {
                    enabled: false,
                    date: null,
                    dateIsOpen: false,
                    time: null,
                    timeIsOpen: false,
                    getExpiration : function() {
                        var dateTime = reference.scheduling.expiration.date;
                        dateTime.setHours(reference.scheduling.expiration.time.getHours());
                        dateTime.setMinutes(reference.scheduling.expiration.time.getMinutes());
                        dateTime.setSeconds(0);
                        return dateTime;
                    }
                },
                getScheduling : function() {
                    var dateTime = reference.scheduling.date;
                    dateTime.setHours(reference.scheduling.time.getHours());
                    dateTime.setMinutes(reference.scheduling.time.getMinutes());
                    dateTime.setSeconds(0);
                    return dateTime;
                }
            },
            getModel : function() {
                return {
                    name: reference.basic.name,
                    description: reference.basic.description,
                    frequency: reference.basic.frequency,
                    template: {
                        id: reference.template.selection.id
                    },
                    targets: reference.targets.destinations,
                    scheduleDate: (reference.scheduling.enabled) ? reference.scheduling.getScheduling() : null,
                    expirationDate: (reference.scheduling.expiration.enabled) ? reference.scheduling.expiration.getExpiration() : null
                }
            }
        };
        return reference;
    };

    // == Represents the Campaign to create.
    $scope.campaign = getNewCampaign();

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
        $scope.campaign.template.selection = $scope.availableTemplates[index];
    };

    $scope.onTemplateDeselected = function() {
        $scope.campaign.template.selection = null;
    };

    $scope.onTemplateRemove = {
        proceed: function(dialog, index, template) {
            templateService.delete(template.id, function(data, status, headers, config) {
                console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                var selection = $scope.campaign.template.selection;
                if (selection) {
                    if (template.id === selection.id) {
                        $scope.onTemplateDeselected();
                    }
                }
                $scope.availableTemplates = _.reject($scope.availableTemplates, function(current){
                    return template.id === current.id;
                });
                dialog.close();
            })
        }
    };

    // == Dispatching
    $scope.$watch('campaign.scheduling.enabled', function(value){
        if (value) {
            var dateTime = new Date();
            dateTime.setMinutes(dateTime.getMinutes() + 15);

            $scope.campaign.scheduling.date = dateTime;
            $scope.campaign.scheduling.time = dateTime;
        } else {
            $scope.onClear($scope.campaign.scheduling, 'date');
            $scope.onClear($scope.campaign.scheduling, 'time');
        }
    });

    $scope.$watch('campaign.scheduling.expiration.enabled', function(value){
        if (value) {
            var dateTime = new Date();
            dateTime.setDate(dateTime.getDate() + 1);

            $scope.campaign.scheduling.expiration.date = dateTime;
            $scope.campaign.scheduling.expiration.time = dateTime;
        } else {
            $scope.onClear($scope.campaign.scheduling.expiration, 'date');
            $scope.onClear($scope.campaign.scheduling.expiration, 'time');
        }
    });

    $scope.togglePicker = function(object, property) {
        object[property] = !object[property];
    };

    $scope.onClear = function (object, property) {
        object[property] = null;
    };

    $scope.selectFrequency = function(selectedOption) {
        $scope.campaign.basic.frequency = selectedOption.toUpperCase();
        $scope.campaign.basic.frequencyIsOpen = false;
    };

    $scope.toggleFrequency = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.campaign.basic.frequencyIsOpen = !$scope.campaign.basic.frequencyIsOpen;
    };

    // == Users
    var fetchUsers = function() {
        console.info("fetching users...")
        userService.users(function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.targets.source = data.content;
        });
    };

    // == Templates
    var fetchTemplates = function() {
        console.info("fetching templates...")
        templateService.templates(function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.availableTemplates = data.content;
        });
    };

    // == Stores a new campaign
    // Validate Campaign Model
    $scope.isModelReady = function() {
        if (_.isNull($scope.campaign.basic.name)) {
            console.debug("basic - name is null.");
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
            && (_.isNull($scope.campaign.scheduling.date) || _.isNull($scope.campaign.scheduling.time))) {
            console.debug("scheduling - scheduling enabled and date & time is not set.");
            return false;
        }
        if ($scope.campaign.scheduling.expiration.enabled
            && (_.isNull($scope.campaign.scheduling.expiration.date) || _.isNull($scope.campaign.scheduling.expiration.time))) {
            console.debug("scheduling - expiration enabled and date & time is not set.");
            return false;
        }
        return true;
    };

    $scope.submitCampaign = function() {
        campaignService.store($scope.campaign.getModel(), function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $location.path("/");
        });
    };

    // == Reset the form.
    $scope.reset = function() {
        delete $scope.campaign;
        $scope.campaign = getNewCampaign();
        $scope.tabs[0].active = true;
    };


    fetchUsers();
    fetchTemplates();
}]);