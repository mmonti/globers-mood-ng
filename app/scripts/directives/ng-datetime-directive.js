'use strict';

angular.module('globersMoodApp').directive('ngDatetime', function() {

    var attributeValue = function(attributes, attributeName, defaultValue) {
        var attributeValue = attributes[attributeName];
        if (!angular.isUndefined(attributeValue) && attributeValue.length > 0) {
            return attributeValue;
        }
        return defaultValue;
    }

    return {
        restrict: 'A',
        scope: {
            ngModel: "=ngModel",
            ngDisabled: "=ngDisabled"
        },
        link: function postLink(scope, element, attrs) {
            var context = {
                format: attributeValue(attrs, 'format', "yyyy-mm-dd hh:ii:ss"),
                weekStart: attributeValue(attrs, 'weekStart', 0),
                startDate: attributeValue(attrs, 'startDate', new Date()),
                endDate: attributeValue(attrs, 'endDate', null),
                daysOfWeekDisabled: attributeValue(attrs, 'daysOfWeekDisabled', []),
                autoclose: attributeValue(attrs, 'autoclose', true),
                startView: attributeValue(attrs, 'startView', 2),
                minView: attributeValue(attrs, 'minView', 0),
                maxView: attributeValue(attrs, 'maxView', 4),
                todayBtn: attributeValue(attrs, 'todayBtn', true),
                todayHighlight: attributeValue(attrs, 'todayHighlight', true),
                keyboardNavigation: attributeValue(attrs, 'keyboardNavigation', true),
                language:  attributeValue(attrs, 'language', 'en'),
                forceParse: attributeValue(attrs, 'forceParse', true),
                minuteStep: attributeValue(attrs, 'minuteStep', 5),
                pickerPosition: attributeValue(attrs, 'pickerPosition', 'top-right'),
                viewSelect: attributeValue(attrs, 'viewSelect', 0),
                showMeridian: attributeValue(attrs, 'showMeridian', false),
                initialDate: attributeValue(attrs, 'initialDate', new Date()),
                disable: attributeValue(attrs, 'disable', null)
            };

            $(element).datetimepicker(context).
                on('changeDate', function(evt){
                    if (evt.date){
                        scope.$apply(function(){
                            scope.ngModel = evt.date;
                        });
                    }
                }).
                on('resetted', function(evt){
                    scope.$apply(function(){
                        scope.ngModel = null;
                    });
                }
            );
        }
    };
});
