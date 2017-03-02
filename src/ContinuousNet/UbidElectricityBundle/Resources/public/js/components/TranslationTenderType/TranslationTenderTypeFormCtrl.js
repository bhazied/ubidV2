'use strict';

/**
 * Controller for Translation Tender Type Form
 */

app.controller('TranslationTenderTypeFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tenderTypesDataFactory', '$usersDataFactory', '$translationTenderTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tenderTypesDataFactory, $usersDataFactory, $translationTenderTypesDataFactory) {

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


    $scope.tenderTypes = [];
    $scope.tenderTypesLoaded = false;

    $scope.getTenderTypes = function() {
        $timeout(function(){
            $scope.tenderTypesLoaded = true;
            if ($scope.tenderTypes.length == 0) {
                $scope.tenderTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERTYPE')});
                var def = $q.defer();
                $tenderTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[tenderType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTTENDERTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenderTypes = data.results;
                    def.resolve($scope.tenderTypes);
                    $scope.translationTenderType.tender_type = $scope.translationTenderType.tender_type || $scope.tenderTypes[0].id;
                });
                return def;
            } else {
                return $scope.tenderTypes;
            }
        });
    };

    $scope.getTenderTypes();

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
                    $scope.translationTenderType.creator_user = $scope.translationTenderType.creator_user || $scope.users[0].id;
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
            if ($scope.translationTenderType.id > 0) {
                $scope.disableSubmit = true;
                $translationTenderTypesDataFactory.update($scope.translationTenderType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONTENDERTYPEUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONTENDERTYPENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationTenderTypesDataFactory.create($scope.translationTenderType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONTENDERTYPECREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONTENDERTYPENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationtendertypes');
    };
    
    $scope.translation_tender_type_tender_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationTenderTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationTenderType = savable(data);
            });
        });
    } else {
        $scope.translationTenderType = {id: 0};

        if (angular.isDefined($stateParams.translation_tender_type_tender_type) && JSON.parse($stateParams.translation_tender_type_tender_type) != null) {
            $scope.translationTenderType.tender_type = $stateParams.translation_tender_type_tender_type;
            $scope.translation_tender_type_tender_type_readonly = true;
        }
    }

}]);

