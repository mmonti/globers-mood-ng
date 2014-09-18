'use strict';

angular.module('globersMoodApp').controller('projectBrowseController',
    ['$scope', 'configuration', 'projectService', 'userService', function ($scope, configuration, projectService, userService) {

        $scope.projects = null;

        var fetchProjects = function() {
            projectService.projects(function(data, status, headers, config) {
                console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                $scope.projects = data.content;
            });
        };
        fetchProjects();

        $scope.onImportFromProject = function(project) {
            userService.usersOfProject(project.id, function(data, status, headers, config) {
                console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                if (data && data.length > 0) {
                    $scope.ref.campaign.targets.destinations = _.union($scope.ref.campaign.targets.destinations, _.flatten(data));
                }
            });
            $scope.close();
        }

}]);