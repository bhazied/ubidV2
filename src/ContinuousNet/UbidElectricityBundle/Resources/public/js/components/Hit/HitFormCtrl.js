'use strict';

/**
 * Controller for Hit Form
 */

app.controller('HitFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$visitsDataFactory', '$usersDataFactory', '$hitsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $visitsDataFactory, $usersDataFactory, $hitsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'hits',
            editor: 'ckeditor'
        },
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
                    if (angular.isDefined($scope.hit)) {
                        $scope.hit.visit = $scope.hit.visit || $scope.visits[0].id;
                    }
                });
                return def;
            } else {
                return $scope.visits;
            }
        });
    };

    $scope.getVisits();

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
                    if (angular.isDefined($scope.hit)) {
                        $scope.hit.creator_user = $scope.hit.creator_user || $scope.users[0].id;
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
            if ($scope.hit.id > 0) {
                $scope.disableSubmit = true;
                $hitsDataFactory.update($scope.hit).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.HITUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.HITNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $hitsDataFactory.create($scope.hit).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.HITCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.HITNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.statistics.hits');
    };
    
    $scope.hit_visit_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $hitsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.hit = savable(data);
            });
        });
    } else {
        $scope.hit = {id: 0};

        if (angular.isDefined($stateParams.hit_visit) && JSON.parse($stateParams.hit_visit) != null) {
            $scope.hit.visit = $stateParams.hit_visit;
            $scope.hit_visit_readonly = true;
        }
    }

}]);

