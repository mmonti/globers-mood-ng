'use strict';

angular.module('globersMoodApp').directive('ngFrame',
    [
        function() {

    return {
        restrict: 'A',
        scope: {
            ngModel: "="
        },
        link: function postLink(scope, element, attrs) {
            var template = scope.ngModel;
            var safeDocument = template.replace(/form/g, "div");
            angular.element(element)[0].src = "data:text/html;charset=utf-8," + escape(safeDocument);
        }
    };
}]);
