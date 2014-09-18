'use strict';

angular.module('globersMoodApp').controller('projectCreateAssignController',
    ['$scope', 'configuration', 'projectService', function ($scope, configuration, projectService) {

        $scope.projects = null;

        var fetchProjects = function() {
            projectService.projects(function(data, status, headers, config) {
                console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                $scope.projects = data.content;
            });
        };
        fetchProjects();

        $scope.onProjectCreate = function() {
            var project = {
                name : $scope.projectName
            };
            projectService.store(project, function(){
                fetchProjects();
                $scope.projectName = null;
            });
        };

        $scope.onSelectProject = function(project) {
            $scope.ref.campaign.targets.project = project;
            var destinations = _.map($scope.ref.campaign.targets.destinations, function(target) {
                target.project = project;
                return target;
            });
            console.log(destinations);
            $scope.close();
        }

}]);