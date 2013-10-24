'use strict';

angular.module('globersMoodApp').controller('setupController', function ($scope, $http, configuration) {

    $scope.file = null;
    $scope.files = [];
    $scope.fileName = null;

    $scope.currentLoad = {
        projects : 200,
        users : 3140,
        customers : 140,
        campaigns : 6,
        templates : 2
    };

    // = Open the File Dialog.
    $scope.choose = function(fileInput) {
        angular.element('input[type=file]')[0].click();
    }

    // = Clears the selected file.
    $scope.clear = function() {
        $scope.files = [];
        $scope.fileName = "";
    }

    // = listen for the file selected event
    $scope.$on("fileSelected", function(event, args) {
        $scope.$apply(function () {
            // = add the file object to the scope's files collection
            $scope.file = args.file;
            $scope.files.push(args.file);
            $scope.fileName = args.file.name;
        });
    });

    $scope.submit = function submit() {
        return $http({
            method: 'POST',
            url: configuration.getServiceEndpoint('setup.store.file'),
            data: {
                file: $scope.file
            },

            // IMPORTANT!!! You might think this should be set to 'multipart/form-data'
            // but this is not true because when we are sending up files the request
            // needs to include a 'boundary' parameter which identifies the boundary
            // name between parts in this multi-part request and setting the Content-type
            // manually will not set this boundary parameter. For whatever reason,
            // setting the Content-type to 'false' will force the request to automatically
            // populate the headers properly including the boundary parameter.

            headers: {
                'Content-Type': false
            },

            // This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'
            transformRequest: function (data) {
//                var formData = new FormData();
//                // need to convert our json object to a string version of json otherwise
//                // the browser will do a 'toString()' on the object which will result
//                // in the value '[Object object]' on the server.
//
//                // ? append any model to the formData.
//
//                // = now add all of the assigned files
//                if (data.files) {
//                    for (var idx = 0; idx < data.files; idx++) {
//                        // = add each file to the form data and iteratively name them
//                        formData.append("file" + idx, data.files[idx]);
//                    }
//                    return formData;
//                }
//                return formData.append("file" + idx, data.file);

                var formData = new FormData();
                formData.append("file", data.file);
                return formData;
            }

        }).success(function (data, status, headers, config) {
            $scope.currentLoad = data;
        }).error(function (data, status, headers, config) {
            console.log("failed!");
        });
    }
});
