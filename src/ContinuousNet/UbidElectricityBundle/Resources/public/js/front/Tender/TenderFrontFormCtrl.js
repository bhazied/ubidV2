app.controller('TenderFrontFormCtrl', ['$rootScope', '$scope', '$controller', '$state', 'SweetAlert','toaster', '$filter', 'FileUploader', function ($rootScope, $scope, $controller, $state, SweetAlert, toaster, $filter, FileUploader) {
    angular.extend(this, $controller('TenderFormCtrl', {$scope:$scope}));
    
   $scope.currentStep = 1;
    $scope.steps = [
        {
            step : 1,
            name: $filter('translate')('content.text.STEP1'),
            template : '/bundles/ubidelectricity/js/front/Tender/Steps/step1.html'
        },
        {
            step : 2,
            name: $filter('translate')('content.text.STEP2'),
            template : '/bundles/ubidelectricity/js/front/Tender/Steps/step2.html'
        },
        {
            step : 3,
            name: $filter('translate')('content.text.STEP3'),
            template : '/bundles/ubidelectricity/js/front/Tender/Steps/step3.html'
        }
    ];

    $scope.goToStep = function (step) {
        $scope.currentStep = step;
    }
    
    $scope.getStepTemplate = function () {
        for(var i in $scope.steps){
            if($scope.currentStep == $scope.steps[i].step){
                return $scope.steps[i].template;
            }
        }
    }

    var uploader = $scope.uploader = new FileUploader({
        url: $rootScope.apiURL + "upload"
    });

    uploader.filters.push({
        name: 'TenderFilesFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            //return '|doc|pdf|docx|zip|tar|'.indexOf(type) !== -1;
            return this.queue.length < 10;
        }
    });

    /***********************************************************/

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };



    /************************************************************/

    $scope.submitForm = function(form) {
        console.log(form);
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
            $scope.disableSubmit = true;
            /*$buyersDataFactory.update($scope.buyer).$promise.then(function(data) {
                $scope.disableSubmit = false;
                toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BUYERUPDATED'));
            }, function(error) {
                $scope.disableSubmit = false;
                toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BUYERNOTUPDATED'));
            });*/
            return false;
        }
    };

}]);