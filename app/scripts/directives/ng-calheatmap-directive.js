'use strict';

angular.module('globersMoodApp').directive('calHeatMap', [ function() {
    return {
        restrict: 'E',
        scope: {
            config: "=",
            click: "="
        },
        link: function postLink(scope, element, attrs) {
            var defaultConfig = {
                itemSelector: element[0]
            };

            angular.extend(defaultConfig, scope.config);

            var heatMap = new CalHeatMap();
            heatMap.init(defaultConfig);

            scope.$watch('config.data', function(value){
                if (value) {
                    heatMap.update(value, true);
                }
            });
        }
    };
}]);
