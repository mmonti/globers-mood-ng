'use strict';

/**
 * @ngdoc filter
 * @name globersMoodApp.filter:dateRelative
 * @function
 * @description
 * # dateRelative
 * Filter in the globersMoodApp.
 */
angular.module('globersMoodApp')
  .filter('dateRelative', function () {
    return function (input) {
        var units = ["millisecond(s)", "second(s)", "minute(s)", "hour(s)", "day(s)", "month(s)", "year(s)"];
        if (!input) {
            return;
        }
        var date = Date.create(input);
        if (date.isFuture()) {
            return;
        }
        return date.relative(function(value, unit, ms, loc) {
            var millis = value.milliseconds();
            return (ms - millis)
//            return value + units[unit];
        });
    };
  });
