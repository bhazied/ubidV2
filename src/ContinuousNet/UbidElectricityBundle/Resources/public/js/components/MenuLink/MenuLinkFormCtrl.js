'use strict';

/**
 * Controller for Menu Link Form
 */

app.controller('MenuLinkFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$menusDataFactory', '$usersDataFactory', '$menuLinksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $menusDataFactory, $usersDataFactory, $menuLinksDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/menulinks',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'menulinks',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.menus = [];
    $scope.menusLoaded = false;

    $scope.getMenus = function() {
        $timeout(function(){
            $scope.menusLoaded = true;
            if ($scope.menus.length == 0) {
                $scope.menus.push({id: '', name: $filter('translate')('content.form.messages.SELECTMENU')});
                var def = $q.defer();
                $menusDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[menu.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTMENU')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.menus = data.results;
                    def.resolve($scope.menus);
                    if (angular.isDefined($scope.menuLink)) {
                        $scope.menuLink.menu = $scope.menuLink.menu || $scope.menus[0].id;
                    }
                });
                return def;
            } else {
                return $scope.menus;
            }
        });
    };

    $scope.getMenus();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', username: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.menuLink)) {
                        $scope.menuLink.creator_user = $scope.menuLink.creator_user || $scope.users[0].id;
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
            if ($scope.menuLink.id > 0) {
                $scope.disableSubmit = true;
                $menuLinksDataFactory.update($scope.menuLink).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MENULINKUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MENULINKNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $menuLinksDataFactory.create($scope.menuLink).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MENULINKCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MENULINKNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.settings.menulinks');
    };
    
    $scope.menu_link_menu_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $menuLinksDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.menuLink = savable(data);
            });
        });
    } else {
        $scope.menuLink = {id: 0};

        if (angular.isDefined($stateParams.menu_link_menu) && JSON.parse($stateParams.menu_link_menu) != null) {
            $scope.menuLink.menu = $stateParams.menu_link_menu;
            $scope.menu_link_menu_readonly = true;
        }
    }

}]);

