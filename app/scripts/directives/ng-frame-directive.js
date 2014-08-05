'use strict';

angular.module('globersMoodApp').directive('ngFrame', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function postLink(scope, element, attrs) {
            var template = scope.$parent.template;
            var safeDocument = template.template.replace(/form/g, "div");
            angular.element(element)[0].src = "data:text/html;charset=utf-8," + escape(safeDocument);
        }
    };
});
