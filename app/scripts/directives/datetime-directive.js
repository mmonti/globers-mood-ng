'use strict';

//$(".form_datetime").datetimepicker({
//    format: "dd MM yyyy - hh:ii",
//    autoclose: true,
//    todayBtn: true,
//    startDate: "2013-02-14 10:00",
//    minuteStep: 10
//});

angular.module('globersMoodApp').directive('datetime', function () {
    return {
        restrict: 'A',
        link: function postLink($scope, $element, $attrs) {
//            $scope.dateTime = $element.datetimepicker({
//                format: "dd MM yyyy - hh:ii",
//                autoclose: true,
//                todayBtn: true,
//                minuteStep: 10
//            });
        }
    };
});
