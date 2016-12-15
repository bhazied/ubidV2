'use strict';

/**
 * Controller for Buyer Form
 */

app.controller('BuyerFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$buyersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $buyersDataFactory) {

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


    $scope.buyerTypes = [];
    $scope.buyerTypesLoaded = false;

    $scope.getBuyerTypes = function() {
        $timeout(function(){
            $scope.buyerTypesLoaded = true;
            if ($scope.buyerTypes.length == 0) {
                $scope.buyerTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBUYERTYPE')});
                var def = $q.defer();
                $buyerTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[buyerType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.buyerTypes = data.results;
                    def.resolve($scope.buyerTypes);
                });
                return def;
            } else {
                return $scope.buyerTypes;
            }
        });
    };

    $scope.getBuyerTypes();

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
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

    $scope.languages = [];
    $scope.languagesLoaded = false;

    $scope.getLanguages = function() {
        $timeout(function(){
            $scope.languagesLoaded = true;
            if ($scope.languages.length == 0) {
                $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
                var def = $q.defer();
                $languagesDataFactory.query({offset: 0, limit: 10000, 'order_by[language.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.languages = data.results;
                    def.resolve($scope.languages);
                });
                return def;
            } else {
                return $scope.languages;
            }
        });
    };

    $scope.getLanguages();

    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $timeout(function(){
            $scope.regionsLoaded = true;
            if ($scope.regions.length == 0) {
                $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTFIRSTMARKETREGION')});
                var def = $q.defer();
                $regionsDataFactory.query({offset: 0, limit: 10000, 'order_by[region.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.regions = data.results;
                    def.resolve($scope.regions);
                });
                return def;
            } else {
                return $scope.regions;
            }
        });
    };

    $scope.getRegions();

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
            if ($scope.buyer.id > 0) {
                $scope.disableSubmit = true;
                $buyersDataFactory.update($scope.buyer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BUYERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BUYERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $buyersDataFactory.create($scope.buyer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BUYERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BUYERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.buyers');
    };
    
    $scope.buyer_buyer_type_readonly = false;
    $scope.buyer_country_readonly = false;
    $scope.buyer_language_readonly = false;
    $scope.buyer_first_market_region_readonly = false;
    $scope.buyer_second_market_region_readonly = false;
    $scope.buyer_third_market_region_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $buyersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.buyer = savable(data);
            });
        });
    } else {
        $scope.buyer = {id: 0};

        if (angular.isDefined($stateParams.buyer_buyer_type) && JSON.parse($stateParams.buyer_buyer_type) != null) {
            $scope.buyer.buyer_type = $stateParams.buyer_buyer_type;
            $scope.buyer_buyer_type_readonly = true;
        }
        if (angular.isDefined($stateParams.buyer_country) && JSON.parse($stateParams.buyer_country) != null) {
            $scope.buyer.country = $stateParams.buyer_country;
            $scope.buyer_country_readonly = true;
        }
        if (angular.isDefined($stateParams.buyer_language) && JSON.parse($stateParams.buyer_language) != null) {
            $scope.buyer.language = $stateParams.buyer_language;
            $scope.buyer_language_readonly = true;
        }
        if (angular.isDefined($stateParams.buyer_first_market_region) && JSON.parse($stateParams.buyer_first_market_region) != null) {
            $scope.buyer.first_market_region = $stateParams.buyer_first_market_region;
            $scope.buyer_first_market_region_readonly = true;
        }
        if (angular.isDefined($stateParams.buyer_second_market_region) && JSON.parse($stateParams.buyer_second_market_region) != null) {
            $scope.buyer.second_market_region = $stateParams.buyer_second_market_region;
            $scope.buyer_second_market_region_readonly = true;
        }
        if (angular.isDefined($stateParams.buyer_third_market_region) && JSON.parse($stateParams.buyer_third_market_region) != null) {
            $scope.buyer.third_market_region = $stateParams.buyer_third_market_region;
            $scope.buyer_third_market_region_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/ubidelectricity/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.buyer[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'buyers';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.buyer[field] = url;
        }, function () {
            
        });
    
    };

}]);
