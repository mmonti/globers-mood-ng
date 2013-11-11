'use strict';

angular.module('globersMoodApp').directive('ngSpinner', function () {
    return {
        template: '<span class=\"ng-spinner\"><i class=\"fa fa-refresh fa-spin\"></i><span ng-transclude>&nbsp;&nbsp;loading...</span></span>',
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function postLink(scope, element, attrs) {
            scope.$on("loading-success", function(event, args) {
                console.log("loading: success");
                setTimeout(function() {
                    angular.element(element).hide();
                }, 1000);
            });
            scope.$on("loading-error", function(event, args) {
                console.log("loading: error");
                setTimeout(function() {
                    angular.element(element).hide();
                }, 1000);
            });
            scope.$on("loading-waiting", function(event, args) {
                console.log("loading: waiting");
                angular.element(element).show();
            });
        }
    };
});
