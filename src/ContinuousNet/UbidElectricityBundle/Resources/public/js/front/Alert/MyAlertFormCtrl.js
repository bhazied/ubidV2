'use strict';

/**
 * Controller for Alert Form in FrontEnd
 */

app.controller('MyAlertFormCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$categoriesDataFactory', '$countriesDataFactory', '$alertsDataFactory','$controller', '$tendersFrontDataFactory',
    function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $categoriesDataFactory, $countriesDataFactory, $alertsDataFactory, $controller, $tendersFrontDataFactory) {


        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1000);

        angular.extend(this, $controller('AlertFormCtrl', {$scope:$scope}));
        $scope.enableFormAlert = false;

        $scope.types = [{
            id: 'Tender',
            title: $filter('translate')('content.list.fields.typesoptions.TENDER'),
            css: 'primary'
        }, {
            id: 'Supplier',
            title: $filter('translate')('content.list.fields.typesoptions.SUPPLIER'),
            css: 'success'
        }, {
            id: 'Buyer',
            title: $filter('translate')('content.list.fields.typesoptions.BUYER'),
            css: 'warning'
        }, {
            id: 'SupplierProduct',
            title: $filter('translate')('content.list.fields.typesoptions.CONSULTATION'),
            css: 'danger'
        }];
        $scope.list = function() {
            $state.go('front.myAlerts.list');
        };

        $scope.selectedCountries = [];
        $scope.selectedCategories = [];
        $scope.selectedCountriesIds = [];

        $scope.frontCategories = [];
        $scope.frontCategoriesLoaded = [];

        $scope.getCategories = function() {
            $timeout(function () {
                $scope.frontCategoriesLoaded = true;
                if($scope.frontCategories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesTenders({locale: $localStorage.language}).$promise.then(function (data) {
                        $scope.frontCategories = data.results;
                        def.resolve($scope.frontCategories);
                    });
                    return def;
                }
                else {
                    return $scope.frontCategories;
                }
            });
        };

        $scope.getCategories();

        $scope.initSelectedCategories = function(){
            if($scope.alert.categories.length > 0){
                $scope.selectedCategories =  $scope.alert.categories;
            }
            else {
                $scope.selectedCategories = [];
            }
        }
        $scope.$watch('countries', function(){
            if(angular.isDefined($scope.alert.countries)){
                angular.forEach($scope.alert.countries, function(value, key){
                    angular.forEach($scope.countries, function(val, k){
                        if(val.id == value){
                            $scope.selectedCountries.push(val);
                        }
                    });
                });
            }
        });

        $scope.addSelectedCountries= function () {
            console.log($scope.alert.countries);
            angular.forEach($scope.alert.countries, function(value, key){
                var index = $scope.selectedCountriesIds.indexOf(value);
                var country = {};
                if(index == -1){
                    angular.forEach($scope.countries, function (cValue, cKey) {
                        if(value == cValue.id){
                            country = cValue;
                            $scope.selectedCountries.push(country);
                            $scope.selectedCountriesIds.push(country.id);
                        }
                    });
                }
            });
        }

        $scope.removeSelectedCountries = function(){
            angular.forEach($scope.alert.selectedCountries, function (value, key) {
               var index  = $scope.selectedCountriesIds.indexOf(value);
                $scope.selectedCountries.splice(index, 1);
                $scope.selectedCountriesIds.splice(index, 1);
            });
        }
        
        $scope.changeParentStatus = function(tcid){
            var selectedVariable = tcid + '_checked';
            $scope[selectedVariable] = !$scope[selectedVariable];
        }

        $scope.parentChecked = function (tcid, tsc) {
            var selectedVariable = tcid + '_checked';
            if (angular.isUndefined($scope[selectedVariable])) {
                $scope[selectedVariable] = false;
                return $scope[selectedVariable];
            }
            if (tcid == tsc.parent_category.id) {
                return $scope[selectedVariable];
            }
            return false;
        }


        $scope.submitForm = function(form, redirect) {
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
                if ($scope.enableFormAlert) {
                    SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
                }
                return false;
            } else {
                $scope.alert.country = $scope.selectedCountriesIds;
                if ($scope.alert.id > 0) {
                    $scope.disableSubmit = true;
                    $alertsDataFactory.update($scope.alert).$promise.then(function(data) {
                        $scope.disableSubmit = false;
                        toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.ALERTUPDATED'));
                        if (redirect) {
                            $scope.list();
                        }
                    }, function(error) {
                        $scope.disableSubmit = false;
                        toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.ALERTNOTUPDATED'));
                        console.warn(error);
                    });
                } else {
                    $scope.disableSubmit = true;
                    $alertsDataFactory.create($scope.alert).$promise.then(function(data) {
                        $scope.disableSubmit = false;
                        toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.ALERTCREATED'));
                        if (redirect) {
                            $scope.list();
                        }
                    }, function(error) {
                        $scope.disableSubmit = false;
                        toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.ALERTNOTCREATED'));
                        console.warn(error);
                    });
                }
                return false;
            }
        };

    }]);

