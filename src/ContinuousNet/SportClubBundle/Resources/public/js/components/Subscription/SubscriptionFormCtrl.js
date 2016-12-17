'use strict';

/**
 * Controller for Subscription Form
 */

app.controller('SubscriptionFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$visitsDataFactory', '$packagesDataFactory', '$pricesDataFactory', '$usersDataFactory', '$subscriptionsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $visitsDataFactory, $packagesDataFactory, $pricesDataFactory, $usersDataFactory, $subscriptionsDataFactory) {

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

    $scope.statuses = [{
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.statuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'PaymentSuccess',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTSUCCESS'),
        css: 'success'
    }, {
        id: 'PaymentFailed',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTFAILED'),
        css: 'warning'
    }, {
        id: 'DeliveredSuccess',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDSUCCESS'),
        css: 'danger'
    }, {
        id: 'DeliveredFailed',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDFAILED'),
        css: 'default'
    }];

    $scope.startDateOpened = false;
    $scope.startDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = !$scope.startDateOpened;
    };

    $scope.endDateOpened = false;
    $scope.endDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endDateOpened = !$scope.endDateOpened;
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
    $scope.visits = [];
    $scope.visitsLoaded = false;

    $scope.getVisits = function() {
        $timeout(function(){
            $scope.visitsLoaded = true;
            if ($scope.visits.length == 0) {
                $scope.visits.push({id: '', title: $filter('translate')('content.form.messages.SELECTVISIT')});
                var def = $q.defer();
                $visitsDataFactory.query({offset: 0, limit: 10000, 'order_by[visit.ip]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.visits = data.results;
                    def.resolve($scope.visits);
                });
                return def;
            } else {
                return $scope.visits;
            }
        });
    };

    $scope.getVisits();

    $scope.packages = [];
    $scope.packagesLoaded = false;

    $scope.getPackages = function() {
        $timeout(function(){
            $scope.packagesLoaded = true;
            if ($scope.packages.length == 0) {
                $scope.packages.push({id: '', title: $filter('translate')('content.form.messages.SELECTPACKAGE')});
                var def = $q.defer();
                $packagesDataFactory.query({offset: 0, limit: 10000, 'order_by[package.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.packages = data.results;
                    def.resolve($scope.packages);
                });
                return def;
            } else {
                return $scope.packages;
            }
        });
    };

    $scope.getPackages();

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
            if ($scope.subscription.id > 0) {
                $scope.disableSubmit = true;
                $subscriptionsDataFactory.update($scope.subscription).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUBSCRIPTIONUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUBSCRIPTIONNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $subscriptionsDataFactory.create($scope.subscription).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUBSCRIPTIONCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUBSCRIPTIONNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.offer.subscriptions');
    };
    
    $scope.subscription_visit_readonly = false;
    $scope.subscription_package_readonly = false;
    $scope.subscription_price_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $subscriptionsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.subscription = savable(data);
                if ($scope.subscription.start_date != null) {
                    $scope.subscription.start_date = new Date($scope.subscription.start_date);
                }
                if ($scope.subscription.end_date != null) {
                    $scope.subscription.end_date = new Date($scope.subscription.end_date);
                }
            });
        });
    } else {
        $scope.subscription = {id: 0, status: 'Initialized'};

        if (angular.isDefined($stateParams.subscription_visit) && JSON.parse($stateParams.subscription_visit) != null) {
            $scope.subscription.visit = $stateParams.subscription_visit;
            $scope.subscription_visit_readonly = true;
        }
        if (angular.isDefined($stateParams.subscription_package) && JSON.parse($stateParams.subscription_package) != null) {
            $scope.subscription.package = $stateParams.subscription_package;
            $scope.subscription_package_readonly = true;
        }
        if (angular.isDefined($stateParams.subscription_price) && JSON.parse($stateParams.subscription_price) != null) {
            $scope.subscription.price = $stateParams.subscription_price;
            $scope.subscription_price_readonly = true;
        }
    }

}]);

