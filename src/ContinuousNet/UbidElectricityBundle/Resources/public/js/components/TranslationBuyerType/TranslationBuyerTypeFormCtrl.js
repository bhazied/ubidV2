'use strict';

/**
 * Controller for Translation Buyer Type Form
 */

app.controller('TranslationBuyerTypeFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyerTypesDataFactory', '$usersDataFactory', '$translationBuyerTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyerTypesDataFactory, $usersDataFactory, $translationBuyerTypesDataFactory) {

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


    $scope.buyerTypes = [];
    $scope.buyerTypesLoaded = false;

    $scope.getBuyerTypes = function() {
        $timeout(function(){
            $scope.buyerTypesLoaded = true;
            if ($scope.buyerTypes.length == 0) {
                $scope.buyerTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBUYERTYPE')});
                var def = $q.defer();
                $buyerTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[buyerType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTBUYERTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.buyerTypes = data.results;
                    def.resolve($scope.buyerTypes);
                    if (angular.isDefined($scope.translationBuyerType)) {
                        $scope.translationBuyerType.buyer_type = $scope.translationBuyerType.buyer_type || $scope.buyerTypes[0].id;
                    }
                });
                return def;
            } else {
                return $scope.buyerTypes;
            }
        });
    };

    $scope.getBuyerTypes();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.translationBuyerType)) {
                        $scope.translationBuyerType.creator_user = $scope.translationBuyerType.creator_user || $scope.users[0].id;
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
            if ($scope.translationBuyerType.id > 0) {
                $scope.disableSubmit = true;
                $translationBuyerTypesDataFactory.update($scope.translationBuyerType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONBUYERTYPEUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONBUYERTYPENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationBuyerTypesDataFactory.create($scope.translationBuyerType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONBUYERTYPECREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONBUYERTYPENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationbuyertypes');
    };
    
    $scope.translation_buyer_type_buyer_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationBuyerTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationBuyerType = savable(data);
            });
        });
    } else {
        $scope.translationBuyerType = {id: 0};

        if (angular.isDefined($stateParams.translation_buyer_type_buyer_type) && JSON.parse($stateParams.translation_buyer_type_buyer_type) != null) {
            $scope.translationBuyerType.buyer_type = $stateParams.translation_buyer_type_buyer_type;
            $scope.translation_buyer_type_buyer_type_readonly = true;
        }
    }

}]);

