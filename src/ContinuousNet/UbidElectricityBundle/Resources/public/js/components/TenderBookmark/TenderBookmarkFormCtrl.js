'use strict';

/**
 * Controller for Tender Bookmark Form
 */

app.controller('TenderBookmarkFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tendersDataFactory', '$usersDataFactory', '$tenderBookmarksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tendersDataFactory, $usersDataFactory, $tenderBookmarksDataFactory) {

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

    $scope.statuses = [{
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Inactive',
        title: $filter('translate')('content.list.fields.statuses.INACTIVE'),
        css: 'success'
    }];

    $scope.tenders = [];
    $scope.tendersLoaded = false;

    $scope.getTenders = function() {
        $timeout(function(){
            $scope.tendersLoaded = true;
            if ($scope.tenders.length == 0) {
                $scope.tenders.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDER')});
                var def = $q.defer();
                $tendersDataFactory.query({offset: 0, limit: 10000, 'order_by[tender.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenders = data.results;
                    def.resolve($scope.tenders);
                });
                return def;
            } else {
                return $scope.tenders;
            }
        });
    };

    $scope.getTenders();

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
            if ($scope.tenderBookmark.id > 0) {
                $scope.disableSubmit = true;
                $tenderBookmarksDataFactory.update($scope.tenderBookmark).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERBOOKMARKUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERBOOKMARKNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $tenderBookmarksDataFactory.create($scope.tenderBookmark).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERBOOKMARKCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERBOOKMARKNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.access.tenderbookmarks');
    };
    
    $scope.tender_bookmark_tender_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $tenderBookmarksDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.tenderBookmark = savable(data);
            });
        });
    } else {
        $scope.tenderBookmark = {id: 0, status: 'Active'};

        if (angular.isDefined($stateParams.tender_bookmark_tender) && JSON.parse($stateParams.tender_bookmark_tender) != null) {
            $scope.tenderBookmark.tender = $stateParams.tender_bookmark_tender;
            $scope.tender_bookmark_tender_readonly = true;
        }
    }

}]);

