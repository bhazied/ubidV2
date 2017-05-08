'use strict';

/**
 * Controller for Alert Form in FrontEnd
 */

app.controller('MyAlertFormCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$categoriesDataFactory', '$countriesDataFactory', '$alertsDataFactory','$controller', '$tendersFrontDataFactory',"$window",
    function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $categoriesDataFactory, $countriesDataFactory, $alertsDataFactory, $controller, $tendersFrontDataFactory, $window) {


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
            $state.go('front.myAlerts.list', {locale: $rootScope.locale});
        };


        $scope.selectedCountries = [];
        $scope.selectedCategories = [];
        $scope.selectedCountriesIds = [];

        $scope.checkedCategories = [];
        $scope.checkedCategoriesids = [];

        $scope.frontCategories = [];
        $scope.frontCategoriesLoaded = [];

        /*
        $scope.getCategories = function() {
            $timeout(function () {
                $scope.frontCategoriesLoaded = true;
                if($scope.frontCategories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesList({locale: $localStorage.language}).$promise.then(function (data) {
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
        */

        $scope.getCategories = function() {
            $timeout(function(){
                if ($scope.frontCategories.length == 0) {
                    $scope.frontCategories.push({});
                    var def = $q.defer();
                    $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
                        data.results = $rootScope.createTree(data.results, 'parent_category', 'name', null, 0);
                        console.log(data.results);
                        $scope.frontCategories = data.results;
                        def.resolve($scope.frontCategories);
                    });
                    return def;
                } else {
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
                            $scope.selectedCountriesIds.push(val.id);
                        }
                    });
                });
            }
        });

        $scope.$watch('categories', function(){
            if(angular.isDefined($scope.alert.categories)){
                angular.forEach($scope.alert.categories, function(value, key){
                    angular.forEach($scope.categories, function(val, k){
                        if(val.id == value){
                            $scope.checkedCategories.push(val);
                            $scope.checkedCategoriesids.push(val.id);
                        }
                    });
                });
            }
        });

        $scope.addSelectedCountries= function () {
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


        $scope.addCheckedCategoried = function () {
            angular.forEach($scope.alert.categories, function (value, key) {
                var category = {};
                angular.forEach($scope.categories, function(cval, ckey){
                    if(cval.id == value && $scope.checkedCategoriesids.indexOf(value) == -1){
                        category = cval;
                        $scope.checkedCategories.push(category);
                        $scope.checkedCategoriesids.push(category.id);
                    }
                });
            });
        }

        $scope.removeCheckedCategories = function () {
            console.log($scope.checkedCategories);
            angular.forEach($scope.alert.checkedCategories, function (value, key) {
                var index  = $scope.checkedCategoriesids.indexOf(value);
                $scope.checkedCategories.splice(index, 1);
                $scope.checkedCategoriesids.splice(index, 1);
            });
        }

        /*$scope.changeParentStatus = function(tcid){
            var selectedVariable = tcid + '_checked';
            $scope[selectedVariable] = !$scope[selectedVariable];
        }*/


        /*$scope.parentChecked = function (tcid, tsc) {
            var selectedVariable = tcid + '_checked';
            if (angular.isUndefined($scope[selectedVariable])) {
                $scope[selectedVariable] = false;
                //var pos =  $scope.alert.categories.indexOf(tsc.id);
               // $scope.alert.categories.slice(pos,1);
                return $scope[selectedVariable];
            }
            if (tcid == tsc.parent_category.id) {
                //$scope.alert.categories.push(tsc.id);
                return $scope[selectedVariable];
            }
            return false;
        }*/


        $scope.submitForm = function(form, redirect) {
            var firstError = null;
            if (form.$invalid) {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if(form[field].$name != "country[]" && form[field].$name != "category[]" && form[field].$name != "types[]"){
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }
                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                $window.scrollTo(
                    angular.element('.ng-invalid[name=' + firstError + ']').prop('offsetTop'),
                    angular.element('.ng-invalid[name=' + firstError + ']').prop('offsetLeft')
                );
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


        $scope.$watch('alert', function () {
            if(!angular.isDefined($scope.alert.types)){
                $scope.alert.types = [];
            }
        }
        );

    }]);

