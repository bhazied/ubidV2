'use strict';

/**
 * Controller for Click Form
 */

app.controller('ClickFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$visitsDataFactory', '$bannersDataFactory', '$usersDataFactory', '$clicksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $visitsDataFactory, $bannersDataFactory, $usersDataFactory, $clicksDataFactory) {

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

    $scope.banners = [];
    $scope.bannersLoaded = false;

    $scope.getBanners = function() {
        $timeout(function(){
            $scope.bannersLoaded = true;
            if ($scope.banners.length == 0) {
                $scope.banners.push({id: '', title: $filter('translate')('content.form.messages.SELECTBANNER')});
                var def = $q.defer();
                $bannersDataFactory.query({offset: 0, limit: 10000, 'order_by[banner.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.banners = data.results;
                    def.resolve($scope.banners);
                });
                return def;
            } else {
                return $scope.banners;
            }
        });
    };

    $scope.getBanners();

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
            if ($scope.click.id > 0) {
                $scope.disableSubmit = true;
                $clicksDataFactory.update($scope.click).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.CLICKUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.CLICKNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $clicksDataFactory.create($scope.click).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.CLICKCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.CLICKNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.adserving.clicks');
    };
    
    $scope.click_visit_readonly = false;
    $scope.click_banner_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $clicksDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.click = savable(data);
            });
        });
    } else {
        $scope.click = {id: 0};

        if (angular.isDefined($stateParams.click_visit) && JSON.parse($stateParams.click_visit) != null) {
            $scope.click.visit = $stateParams.click_visit;
            $scope.click_visit_readonly = true;
        }
        if (angular.isDefined($stateParams.click_banner) && JSON.parse($stateParams.click_banner) != null) {
            $scope.click.banner = $stateParams.click_banner;
            $scope.click_banner_readonly = true;
        }
    }

}]);

