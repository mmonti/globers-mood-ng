'use strict';

angular.module('globersMoodApp').directive('wysihtml5', function () {
    var self = this;

    var directive = {
        restrict: 'E',
        replace : true,
        transclude : true,
        require:'?ngModel',
        templateUrl: '/tpl/wysihtml5-directive-template.html',
        link: function postLink($scope, $element, $attrs) {
            $scope.textarea = $('#richtexteditor-content').wysihtml5({
                "font-styles": false,   // = Font styling, e.g. h1, h2, etc. Default true
                "emphasis": false,      // = Italics, bold, etc. Default true
                "lists": false,         // = (Un)ordered lists, e.g. Bullets, Numbers. Default true
                "html": true,           // = Button which allows you to edit the generated HTML. Default false
                "link": false,          // = Button to insert a link. Default true
                "image": false,         // = Button to insert an image. Default true,
                "color": false          // = Button to change color of font,
            });

            $scope.editor = $scope.textarea.data('wysihtml5').editor;
            $scope.textarea.data('wysihtml5').editor.composer.disable();

            $scope.$watch( $attrs.ngmodel, function( newValue, oldValue ) {
                $scope.textarea.innerHTML = newValue;
                $scope.editor.setValue( newValue );
            });

            $scope.editor.on('change', function() {
                $scope.content = $scope.editor.getValue();
                console.log($scope.content);
            });

            $scope.editor.on('load', function() {
                var disabled = this.textareaElement.disabled;
                var readonly = !!this.textareaElement.getAttribute('readonly');

//                if (readonly) {
                    this.composer.element.setAttribute('contenteditable', false);
                    this.toolbar.commandsDisabled = true;
//                }

//                if (disabled) {
                    this.composer.disable();
                    this.toolbar.commandsDisabled = true;
//                }
            });

            $scope.editor.on('change_view', function() {
                console.log("view-changed");

                var disabled = this.textareaElement.disabled;
                var readonly = !!this.textareaElement.getAttribute('readonly');

//                if (readonly) {
                    this.composer.element.setAttribute('contenteditable', false);
                    this.toolbar.commandsDisabled = true;
//                }

//                if (disabled) {
                    this.composer.disable();
                    this.toolbar.commandsDisabled = true;
//                }
            });

            $scope.cancel = function() {
                $scope.$parent.cancel();
            }

            /*
            $scope.save = function() {
                var currentTemplateContent = $encryption.encodeHtml( $scope.editor.getValue() );
                $scope.$parent.currentTemplate.content = currentTemplateContent;
                $scope.$parent.save();
            }
            */

            $scope.isClean = function() {
                $scope.$parent.isClean();
            }
        }
    };
    return directive;
});
