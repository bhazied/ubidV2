'use strict';

/**
 * Controller for user profile
 */
app.controller('ProfileFrontCtrl', ['$element','$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$profileDataFactory','toaster','$filter','$countriesDataFactory','$uibModal','$q','SweetAlert','$window',
    function ($element,$scope, $rootScope, $localStorage, $state, $timeout, $profileDataFactory, toaster, $filter, $countriesDataFactory, $uibModal, $q, SweetAlert, $window) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showUserMenu = true;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.myCountry = {};
        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');

        $scope.disableSubmit = false;
        $scope.disablePasswordSubmit = false;
        $scope.locale = (angular.isDefined($localStorage.language)) ? $localStorage.language : 'en';

        $scope.genders = [{
            id: 'Male',
            title: $filter('translate')('content.list.fields.genders.MALE'),
            css: 'info'
        }, {
            id: 'Female',
            title: $filter('translate')('content.list.fields.genders.FEMALE'),
            css: 'danger'
        }];

        $scope.countries = [];
        $scope.countriesLoaded = false;

        $scope.getCountries = function() {
            $timeout(function(){
                $scope.countriesLoaded = true;
                if ($scope.countries.length == 0) {
                    $scope.countries.push({});
                    var def = $q.defer();
                    $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                        }
                        $scope.countries = data.results;
                        def.resolve($scope.countries);
                    });
                    return def;
                } else {
                    return $scope.countries;
                }
            });
        };

        $scope.getCountries();

        $scope.showFileManager = function (field) {

            var modalInstance = $uibModal.open({
                templateUrl: '/bundles/ubidelectricity/js/common/FileManager/modal_content.html',
                controller: 'FileManagerCtrl',
                size: 'lg',
                resolve: {
                    field: function () {
                        return field;
                    },
                    value: function () {
                        return $scope.user[field];
                    },
                    instance: function() {
                        return 'data';
                    },
                    folder: function() {
                        var user_id = '000000' + $localStorage.user.id;
                        var user_dir = 'user_' + user_id.substr(user_id.length - 6);
                        return user_dir;
                    }
                }
            });
            modalInstance.result.then(function (url) {
                $scope.user[field] = url;
            }, function () {

            });
        };
        $scope.getProfile = function(){
            $timeout(function () {
            $profileDataFactory.getProfile({locale: $localStorage.language}).$promise.then(function (data) {
                    $scope.user = data ;
                if(data.picture != null){
                    $rootScope.user.picture = data.picture;
                    $localStorage.user.picture = data.picture;
                }
                if(data.country != null){
                    $scope.myCountry =  $scope.user.country;
                    $scope.user.country =  $scope.user.country.id;
                    }
                else{
                    $scope.myCountry =  null;
                    $scope.user.country =  null;
                }
                });
            });
        }

        $scope.getProfile();

        $scope.submit = function (form) {
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
                return false;
            } else {
                $scope.user.locale = $localStorage.language;
                $scope.disableSubmit = true;
                $profileDataFactory.updateProfile($scope.user).$promise.then(function (data) {
                    $scope.disableSubmit = false;
                    if (data.status) {
                        toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('profile.PROFILEUPDATED'));
                        $scope.getProfile();
                    } else {
                        toaster.pop('warning', $filter('translate')('content.common.NOTIFICATION'), data.message);
                    }

                }, function (error) {
                    $scope.disableSubmit = false;
                    console.warn(error);
                });
            }
        };

        $scope.changePassword = function (form) {
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
                return false;
            } else {
                $scope.disablePasswordSubmit = true;
                var $params = {
                    currentPassword : $scope.current_password,
                    newPassword : $scope.new_password,
                    locale: $localStorage.language
                }
                $profileDataFactory.changePassword($params).$promise.then(function(data){
                    if(data.status == true){
                        toaster.pop('success', $filter('translate')('title.error.CHANGEPASSWORD'), data.message);
                    }else{
                        toaster.pop('error', $filter('translate')('title.error.CHANGEPASSWORD'), data.message);

                    }
                    $scope.disablePasswordSubmit = false;
                });
            }
        }

        $scope.phoneNumbr = /^\+?\d+$/;
        
        $scope.tabs = [
            { title: $filter('translate')('profile.INFORMATIONS'), template:'/bundles/ubidelectricity/js/front/Auth/profile_informations.html' },
            { title: $filter('translate')('profile.UPDATEPROFILE'), template:'/bundles/ubidelectricity/js/front/Auth/update_account.html' },
            { title: $filter('translate')('profile.CHANGEPASSWORD'), template:'/bundles/ubidelectricity/js/front/Auth/change_password.html' }
        ];

    }]);


app.directive('passwordCheck', function($profileDataFactory, $timeout, $localStorage){
    return {
        require: 'ngModel',
        link : function (scope, elm, attrs, ngModel) {
            ngModel.$asyncValidators.passwordCheck = function (modelValue, viewValue) {
                if(ngModel.$isEmpty(modelValue)){
                    ngModel.$setValidity('passwordCheck', false);
                }
                return $profileDataFactory.checkPassword({locale: $localStorage.language, currentPassword: viewValue}).$promise.then(function (data) {
                    $timeout(function () {
                        ngModel.$setValidity('passwordCheck', data.status);
                    }, 1000);
                })
            }
        }
    }
});
