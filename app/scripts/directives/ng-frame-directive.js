'use strict';

angular.module('globersMoodApp').directive('ngFrame', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function postLink(scope, element, attrs) {
            var template = scope.$parent.template;
            angular.element(element)[0].src = "data:text/html;charset=utf-8," + escape(template.template);
        }
    };
});
