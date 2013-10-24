'use strict';

angular.module('globersMoodApp').controller('campaignController', function ($scope, campaignService, projectService, templateService) {

    $scope.roles = [
        {roleId: 1, roleName: "Administrator"},
        {roleId: 2, roleName: "Super User"},
        {roleId: 3, roleName: "Manager"}
    ];

    $scope.user = {
        userId: 1,
        username: "JimBob",
        roles: [$scope.roles[0]]
    };

    $scope.campaign = {};
    $scope.availableProjects = [];
    $scope.availableTemplates = [];

    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

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

    // = Stores a new campaign
    $scope.submitCampaign = function() {
    }

    // = Reset the form.
    $scope.reset = function() {
        $scope.campaign = {};
    }

});
