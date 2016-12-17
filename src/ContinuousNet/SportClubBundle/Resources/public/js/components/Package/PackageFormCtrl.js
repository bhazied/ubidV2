'use strict';

/**
 * Controller for Package Form
 */

app.controller('PackageFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$packageTypesDataFactory', '$pricesDataFactory', '$usersDataFactory', '$packagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $packageTypesDataFactory, $pricesDataFactory, $usersDataFactory, $packagesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

    $scope.modes = [{
        id: 'Product',
        title: $filter('translate')('content.list.fields.modes.PRODUCT'),
        css: 'primary'
    }, {
        id: 'Subscription',
        title: $filter('translate')('content.list.fields.modes.SUBSCRIPTION'),
        css: 'success'
    }];

    $scope.packageTypes = [];
    $scope.packageTypesLoaded = false;

    $scope.getPackageTypes = function() {
        $timeout(function(){
            $scope.packageTypesLoaded = true;
            if ($scope.packageTypes.length == 0) {
                $scope.packageTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPACKAGETYPE')});
                var def = $q.defer();
                $packageTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[packageType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.packageTypes = data.results;
                    def.resolve($scope.packageTypes);
                });
                return def;
            } else {
                return $scope.packageTypes;
            }
        });
    };

    $scope.getPackageTypes();

    $scope.prices = [];
    $scope.pricesLoaded = false;

    $scope.getPrices = function() {
        $timeout(function(){
            $scope.pricesLoaded = true;
            if ($scope.prices.length == 0) {
                $scope.prices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRICE')});
                var def = $q.defer();
                $pricesDataFactory.query({offset: 0, limit: 10000, 'order_by[price.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.prices = data.results;
                    def.resolve($scope.prices);
                });
                return def;
            } else {
                return $scope.prices;
            }
        });
    };

    $scope.getPrices();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.submitForm = function(form) {
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
            if ($scope.package.id > 0) {
                $scope.disableSubmit = true;
                $packagesDataFactory.update($scope.package).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PACKAGEUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PACKAGENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $packagesDataFactory.create($scope.package).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PACKAGECREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PACKAGENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.offer.packages');
    };
    
    $scope.package_package_type_readonly = false;
    $scope.package_price_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $packagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.package = savable(data);
            });
        });
    } else {
        $scope.package = {id: 0, mode: 'Product'};

        if (angular.isDefined($stateParams.package_package_type) && JSON.parse($stateParams.package_package_type) != null) {
            $scope.package.package_type = $stateParams.package_package_type;
            $scope.package_package_type_readonly = true;
        }
        if (angular.isDefined($stateParams.package_price) && JSON.parse($stateParams.package_price) != null) {
            $scope.package.price = $stateParams.package_price;
            $scope.package_price_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/sportclub/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.package[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'packages';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.package[field] = url;
        }, function () {
            
        });
    
    };

}]);

