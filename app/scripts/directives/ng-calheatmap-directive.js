'use strict';

angular.module('globersMoodApp').directive('calHeatMap', [ function() {
    return {
        restrict: 'E',
        scope: {
            config: "=",
            update: "="
        },
        template: '<div id="cal-heatmap" config="config" update="update">',
        link: function postLink(scope, element, attrs) {
            var defaultConfig = {
                itemSelector: element[0]
            }

            angular.extend(defaultConfig, scope.config);
            var heatMap = new CalHeatMap();
            heatMap.init(defaultConfig);

            scope.$watch('update', function(value){
                heatMap.update(value, true);
            });
        }
    };
}]);
