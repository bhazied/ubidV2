'use strict';

/**
 * Controller for Impression Form
 */

app.controller('ImpressionFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$visitsDataFactory', '$bannersDataFactory', '$usersDataFactory', '$impressionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $visitsDataFactory, $bannersDataFactory, $usersDataFactory, $impressionsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        extraPlugins: 'colorbutton,colordialog,justify'
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
                $visitsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[visit.ip]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTVISIT')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.visits = data.results;
                    def.resolve($scope.visits);
                    if (angular.isDefined($scope.impression)) {
                        $scope.impression.visit = $scope.impression.visit || $scope.visits[0].id;
                    }
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
                $bannersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[banner.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTBANNER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.banners = data.results;
                    def.resolve($scope.banners);
                    if (angular.isDefined($scope.impression)) {
                        $scope.impression.banner = $scope.impression.banner || $scope.banners[0].id;
                    }
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
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.impression)) {
                        $scope.impression.creator_user = $scope.impression.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.redirect = true;
    $scope.submitForm = function(form, redirect) {
        $scope.redirect = redirect;
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
            if ($scope.impression.id > 0) {
                $scope.disableSubmit = true;
                $impressionsDataFactory.update($scope.impression).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMPRESSIONUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMPRESSIONNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $impressionsDataFactory.create($scope.impression).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMPRESSIONCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMPRESSIONNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.adserving.impressions');
    };
    
    $scope.impression_visit_readonly = false;
    $scope.impression_banner_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $impressionsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.impression = savable(data);
            });
        });
    } else {
        $scope.impression = {id: 0};

        if (angular.isDefined($stateParams.impression_visit) && JSON.parse($stateParams.impression_visit) != null) {
            $scope.impression.visit = $stateParams.impression_visit;
            $scope.impression_visit_readonly = true;
        }
        if (angular.isDefined($stateParams.impression_banner) && JSON.parse($stateParams.impression_banner) != null) {
            $scope.impression.banner = $stateParams.impression_banner;
            $scope.impression_banner_readonly = true;
        }
    }

}]);

