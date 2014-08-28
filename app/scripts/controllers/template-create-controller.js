'use strict';

angular.module('globersMoodApp').controller('templateCreateController',
    ['$scope', 'configuration', '$upload', 'templateService',
        function ($scope, configuration, $upload, templateService) {

    $scope.template = {
        name: null,
        description: null,
        file: null,
        uploadDone: false
    };

    $scope.randomName = function() {
        $scope.template.name = Math.floor((Math.random()*6)+1) + "-template".toLowerCase();
    };

    $scope.onFileSelect = function($files) {
        $scope.template.file = $files[0];
    };

    $scope.onCreate = function() {
        var template = {
            name: $scope.template.name,
            description: $scope.template.description
        }

        $scope.upload = $upload.upload({
            url: configuration.getServiceEndpoint('template.store'),
            method: 'POST',
            // = headers: {'header-key': 'header-value'},
            // = withCredentials: true,
            data: template,
            file: $scope.template.file // or list of files ($files) for html5 only
            // = fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // = customize file formData name ('Content-Desposition'), server side file variable name.
            // = fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // = customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            // = formDataAppender: function(formData, key, val){}

        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            $scope.ref.availableTemplates.push(data);
            $scope.clear();
            $scope.close();
        });

        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    };

    // = Clears the selected file.
    $scope.clear = function() {
        $scope.template.file = null;
    };

    $scope.checkTemplateName = function() {
        var templateName = $scope.template.name;
        if (!templateName || _.isNull(templateName)) {
            console.debug("template - name is null.");
            return false;
        }

        var found = _.find($scope.ref.availableTemplates, function(template) {
            return template.name === templateName;
        });

        return angular.isUndefined(found);
    };

    $scope.isModelReady = function() {
        if (!$scope.checkTemplateName()) {
            return false;
        }
        if (_.isEmpty($scope.template.description)){
            console.debug("template - description is empty.");
            return false;
        }
        if (_.isNull($scope.template.file)) {
            console.debug("template - file is null.");
            return false;
        }
        return true;
    };

}]);