'use strict';

angular.module('globersMoodApp').directive('dialog',
    ['$modal',
        function($modal) {

    return {
        restrict: 'E',
        scope: {
            size: "@",
            header: "@",
            body: "@",
            template: "@",
            handler: "@",
            ngModel: "="
        },
        link: function(scope, element, attrs, controller, transclude) {
            var noop = function() {};

            scope.data = {
                size: scope.size || "sm",
                header: scope.header || "Are you sure?",
                body: scope.body || "Are you sure you want to proceed with this action?",
                templateUrl: scope.template || "/tpl/dialog-modal.html",
                handler: scope.handler || noop
            };

            var template = {};
            if (scope.data.templateUrl) {
                template.templateUrl = scope.data.templateUrl;
            } else {
                template.template = element.html();
            }

            var config = {
                controller: function($scope, $modalInstance, data) {
                    $scope.data = data;
                    $scope.close = function(){
                        $modalInstance.close($scope.data);
                    };
                    $scope.handle = function() {
                        var fn = scope.$parent[scope.data.handler];
                        fn.apply(this, [scope.ngModel, $modalInstance]);
                    }
                },
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                size: scope.data.size,
                resolve: {
                    data: function () {
                        return scope.data;
                    }
                }
            };

            angular.extend(config, template);

            scope.open = function () {
                var modalInstance = $modal.open(config);
                modalInstance.result.then(function(scope) {
                    console.log('close');
                }, function () {
                    console.log('dialog-dismiss');
                });
            };

            element.parent().bind("click", function() { scope.open() });
        }
    };
}]);
