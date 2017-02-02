'use strict';

/**
 * Controller for Translation Bidding Type Form
 */

app.controller('TranslationBiddingTypeFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$biddingTypesDataFactory', '$usersDataFactory', '$translationBiddingTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $biddingTypesDataFactory, $usersDataFactory, $translationBiddingTypesDataFactory) {

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
            if ($scope.translationBiddingType.id > 0) {
                $scope.disableSubmit = true;
                $translationBiddingTypesDataFactory.update($scope.translationBiddingType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONBIDDINGTYPEUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONBIDDINGTYPENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationBiddingTypesDataFactory.create($scope.translationBiddingType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONBIDDINGTYPECREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONBIDDINGTYPENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationbiddingtypes');
    };
    
    $scope.translation_bidding_type_bidding_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationBiddingTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationBiddingType = savable(data);
            });
        });
    } else {
        $scope.translationBiddingType = {id: 0};

        if (angular.isDefined($stateParams.translation_bidding_type_bidding_type) && JSON.parse($stateParams.translation_bidding_type_bidding_type) != null) {
            $scope.translationBiddingType.bidding_type = $stateParams.translation_bidding_type_bidding_type;
            $scope.translation_bidding_type_bidding_type_readonly = true;
        }
    }

}]);

