'use strict';

/**
 * Controller for Translation Menu Link Form
 */

app.controller('TranslationMenuLinkFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$menuLinksDataFactory', '$usersDataFactory', '$translationMenuLinksDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $menuLinksDataFactory, $usersDataFactory, $translationMenuLinksDataFactory) {

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


    $scope.menuLinks = [];
    $scope.menuLinksLoaded = false;

    $scope.getMenuLinks = function() {
        $timeout(function(){
            $scope.menuLinksLoaded = true;
            if ($scope.menuLinks.length == 0) {
                $scope.menuLinks.push({id: '', title: $filter('translate')('content.form.messages.SELECTMENULINK')});
                var def = $q.defer();
                $menuLinksDataFactory.query({offset: 0, limit: 10000, 'order_by[menuLink.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.menuLinks = data.results;
                    def.resolve($scope.menuLinks);
                });
                return def;
            } else {
                return $scope.menuLinks;
            }
        });
    };

    $scope.getMenuLinks();

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
            if ($scope.translationMenuLink.id > 0) {
                $scope.disableSubmit = true;
                $translationMenuLinksDataFactory.update($scope.translationMenuLink).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONMENULINKUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONMENULINKNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationMenuLinksDataFactory.create($scope.translationMenuLink).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONMENULINKCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONMENULINKNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationmenulinks');
    };
    
    $scope.translation_menu_link_menu_link_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationMenuLinksDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationMenuLink = savable(data);
            });
        });
    } else {
        $scope.translationMenuLink = {id: 0};

        if (angular.isDefined($stateParams.translation_menu_link_menu_link) && JSON.parse($stateParams.translation_menu_link_menu_link) != null) {
            $scope.translationMenuLink.menu_link = $stateParams.translation_menu_link_menu_link;
            $scope.translation_menu_link_menu_link_readonly = true;
        }
    }

}]);

