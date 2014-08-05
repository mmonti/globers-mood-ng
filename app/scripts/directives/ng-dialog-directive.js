'use strict';

angular.module('globersMoodApp').directive('dialog', function($modal) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            size: '@',
            templateUrl: '@',
            handler: '@'
        },
        link: function postLink(scope, element, attrs) {

            var noop = function() {};

            scope.data = {
                mode: scope.mode || 'info',
                size: scope.size || 'sm',
                templateUrl: scope.templateUrl || '/tpl/dialog-modal.html',
                handler: scope.handler || noop
            }

            var instanceController = function ($scope, $modalInstance, data) {
                $scope.data = data;
                $scope.close = function(){
                    $modalInstance.close($scope.data);
                };
            };

            element.parent().bind("click", function(event){
                scope.open();
            });

            scope.open = function () {
                var modalInstance = $modal.open({
                    templateUrl: scope.data.templateUrl,
                    controller: instanceController,
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return scope.data;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    scope.selected = selectedItem;
                    scope.handler(selectedItem);
                }, function () {
                    console.log('dialog-dismiss');
                });
            }
        }
    };
});
