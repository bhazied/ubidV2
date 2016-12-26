'use strict';
app.controller('contactFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q','$filter','$contactDataFactory','SweetAlert','toaster',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $contactDataFactory, SweetAlert, toaster) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = true;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 0;
        }, 2000);

        console.log("showLeftSide   "+ $rootScope.showLeftSide);
        console.log("showRightSide  " + $rootScope.showRightSide);

        $scope.disableSubmit = false;
        $scope.submitForm = function (form) {
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
                SweetAlert.swal($filter('translate')('errors.titles.CONTACTFORMFAILEDTITLE'), $filter('translate')('errors.messages.CONTACTFORMFAILEDMESSAGE'), "error");
                return false;
            } else {
                $scope.disableSubmit = true;
                $scope.contact.locale = $localStorage.language;
                $contactDataFactory.contact($scope.contact).$promise.then(function (data) {
                    var type = ''
                    if(data.status == 0){
                        toaster.pop('success', $filter('translate')('infos.titles.CONTACT'), data.message);
                    }
                    if(data.status == 1){
                        toaster.pop('error', $filter('translate')('errors.titles.CONTACT'), data.message);
                    }
                    $scope.disableSubmit = false;
                });
            }
        }

    }]);