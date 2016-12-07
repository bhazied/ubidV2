'use strict';

/**
 * Controller for Tender Form
 */

app.controller('TenderFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyersDataFactory', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$biddingTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$tendersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyersDataFactory, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $biddingTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersDataFactory) {

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

    $scope.sections = [{
        id: 'Consultation',
        title: $filter('translate')('content.list.fields.sections.CONSULTATION'),
        css: 'primary'
    }, {
        id: 'Tender',
        title: $filter('translate')('content.list.fields.sections.TENDER'),
        css: 'success'
    }];
    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.publishDateOpened = false;
    $scope.publishDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.publishDateOpened = !$scope.publishDateOpened;
    };

    $scope.deadlineOpened = false;
    $scope.deadlineToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.deadlineOpened = !$scope.deadlineOpened;
    };

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.buyers = [];
    $scope.buyersLoaded = false;

    $scope.getBuyers = function() {
        $timeout(function(){
            $scope.buyersLoaded = true;
            if ($scope.buyers.length == 0) {
                $scope.buyers.push({id: '', title: $filter('translate')('content.form.messages.SELECTBUYER')});
                var def = $q.defer();
                $buyersDataFactory.query({offset: 0, limit: 10000, 'order_by[buyer.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.buyers = data.results;
                    def.resolve($scope.buyers);
                });
                return def;
            } else {
                return $scope.buyers;
            }
        });
    };

    $scope.getBuyers();

    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $timeout(function(){
            $scope.regionsLoaded = true;
            if ($scope.regions.length == 0) {
                $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTREGION')});
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

    $scope.sectors = [];
    $scope.sectorsLoaded = false;

    $scope.getSectors = function() {
        $timeout(function(){
            $scope.sectorsLoaded = true;
            if ($scope.sectors.length == 0) {
                $scope.sectors.push({id: '', title: $filter('translate')('content.form.messages.SELECTSECTOR')});
                var def = $q.defer();
                $sectorsDataFactory.query({offset: 0, limit: 10000, 'order_by[sector.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sectors = data.results;
                    def.resolve($scope.sectors);
                });
                return def;
            } else {
                return $scope.sectors;
            }
        });
    };

    $scope.getSectors();

    $scope.tenderTypes = [];
    $scope.tenderTypesLoaded = false;

    $scope.getTenderTypes = function() {
        $timeout(function(){
            $scope.tenderTypesLoaded = true;
            if ($scope.tenderTypes.length == 0) {
                $scope.tenderTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERTYPE')});
                var def = $q.defer();
                $tenderTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenderTypes = data.results;
                    def.resolve($scope.tenderTypes);
                });
                return def;
            } else {
                return $scope.tenderTypes;
            }
        });
    };

    $scope.getTenderTypes();

    $scope.biddingTypes = [];
    $scope.biddingTypesLoaded = false;

    $scope.getBiddingTypes = function() {
        $timeout(function(){
            $scope.biddingTypesLoaded = true;
            if ($scope.biddingTypes.length == 0) {
                $scope.biddingTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBIDDINGTYPE')});
                var def = $q.defer();
                $biddingTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[biddingType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.biddingTypes = data.results;
                    def.resolve($scope.biddingTypes);
                });
                return def;
            } else {
                return $scope.biddingTypes;
            }
        });
    };

    $scope.getBiddingTypes();

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

    $scope.categories = [];
    $scope.categoriesLoaded = [];

    $scope.getCategories = function() {
        $timeout(function(){
            if ($scope.categories.length == 0) {
                $scope.categories.push({});
                var def = $q.defer();
                $categoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
                    $scope.categories = data.results;
                    def.resolve($scope.categories);
                });
                return def;
            } else {
                return $scope.categories;
            }
        });
    };

    $scope.getCategories();

    $scope.tenderCategories = false;
    $scope.$watch('tenderCategories', function() {
        if ($scope.tenderCategories) {
            $scope.tender.categories = [];
            for (var i in $scope.categories) {
                $scope.tender.categories.push($scope.categories[i].id);
            }
        } else {
            $scope.tender.categories = [];
        }
    });

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
            if ($scope.tender.id > 0) {
                $scope.disableSubmit = true;
                $tendersDataFactory.update($scope.tender).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $tendersDataFactory.create($scope.tender).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.tenders');
    };
    
    $scope.tender_buyer_readonly = false;
    $scope.tender_region_readonly = false;
    $scope.tender_country_readonly = false;
    $scope.tender_sector_readonly = false;
    $scope.tender_tender_type_readonly = false;
    $scope.tender_bidding_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $tendersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.tender = savable(data);
                if ($scope.tender.publish_date != null) {
                    $scope.tender.publish_date = new Date($scope.tender.publish_date);
                }
                if ($scope.tender.deadline != null) {
                    $scope.tender.deadline = new Date($scope.tender.deadline);
                }
            });
        });
    } else {
        $scope.tender = {id: 0, section: 'Consultation', status: 'Draft', categories: []};

        if (angular.isDefined($stateParams.tender_buyer) && JSON.parse($stateParams.tender_buyer) != null) {
            $scope.tender.buyer = $stateParams.tender_buyer;
            $scope.tender_buyer_readonly = true;
        }
        if (angular.isDefined($stateParams.tender_region) && JSON.parse($stateParams.tender_region) != null) {
            $scope.tender.region = $stateParams.tender_region;
            $scope.tender_region_readonly = true;
        }
        if (angular.isDefined($stateParams.tender_country) && JSON.parse($stateParams.tender_country) != null) {
            $scope.tender.country = $stateParams.tender_country;
            $scope.tender_country_readonly = true;
        }
        if (angular.isDefined($stateParams.tender_sector) && JSON.parse($stateParams.tender_sector) != null) {
            $scope.tender.sector = $stateParams.tender_sector;
            $scope.tender_sector_readonly = true;
        }
        if (angular.isDefined($stateParams.tender_tender_type) && JSON.parse($stateParams.tender_tender_type) != null) {
            $scope.tender.tender_type = $stateParams.tender_tender_type;
            $scope.tender_tender_type_readonly = true;
        }
        if (angular.isDefined($stateParams.tender_bidding_type) && JSON.parse($stateParams.tender_bidding_type) != null) {
            $scope.tender.bidding_type = $stateParams.tender_bidding_type;
            $scope.tender_bidding_type_readonly = true;
        }
    }

}]);

