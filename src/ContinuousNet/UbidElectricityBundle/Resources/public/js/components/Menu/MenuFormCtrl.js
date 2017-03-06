'use strict';

/**
 * Controller for Menu Form
 */

app.controller('MenuFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$usersDataFactory', '$menusDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $usersDataFactory, $menusDataFactory) {

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

    $scope.modes = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'Link',
        title: $filter('translate')('content.list.fields.modes.LINK'),
        css: 'primary'
    }, {
        id: 'ImageCategory',
        title: $filter('translate')('content.list.fields.modes.IMAGECATEGORY'),
        css: 'success'
    }, {
        id: 'PostCategory',
        title: $filter('translate')('content.list.fields.modes.POSTCATEGORY'),
        css: 'warning'
    }, {
        id: 'VideoCategory',
        title: $filter('translate')('content.list.fields.modes.VIDEOCATEGORY'),
        css: 'danger'
    }, {
        id: 'Album',
        title: $filter('translate')('content.list.fields.modes.ALBUM'),
        css: 'default'
    }, {
        id: 'Show',
        title: $filter('translate')('content.list.fields.modes.SHOW'),
        css: 'info'
    }, {
        id: 'Sport',
        title: $filter('translate')('content.list.fields.modes.SPORT'),
        css: 'primary'
    }, {
        id: 'SportEvent',
        title: $filter('translate')('content.list.fields.modes.SPORTEVENT'),
        css: 'success'
    }, {
        id: 'Team',
        title: $filter('translate')('content.list.fields.modes.TEAM'),
        css: 'warning'
    }, {
        id: 'Stadium',
        title: $filter('translate')('content.list.fields.modes.STADIUM'),
        css: 'danger'
    }, {
        id: 'Player',
        title: $filter('translate')('content.list.fields.modes.PLAYER'),
        css: 'default'
    }, {
        id: 'Day',
        title: $filter('translate')('content.list.fields.modes.DAY'),
        css: 'info'
    }, {
        id: 'Package',
        title: $filter('translate')('content.list.fields.modes.PACKAGE'),
        css: 'primary'
    }];
    $scope.displayModes = [{
        id: 'ImageWithText',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEWITHTEXT'),
        css: 'primary'
    }, {
        id: 'ImageOnly',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEONLY'),
        css: 'success'
    }, {
        id: 'TextOnly',
        title: $filter('translate')('content.list.fields.displaymodes.TEXTONLY'),
        css: 'warning'
    }];
    $scope.textPositions = [{
        id: 'None',
        title: $filter('translate')('content.list.fields.textpositions.NONE'),
        css: 'primary'
    }, {
        id: 'Top',
        title: $filter('translate')('content.list.fields.textpositions.TOP'),
        css: 'success'
    }, {
        id: 'Bottom',
        title: $filter('translate')('content.list.fields.textpositions.BOTTOM'),
        css: 'warning'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.textpositions.LEFT'),
        css: 'danger'
    }, {
        id: 'Right',
        title: $filter('translate')('content.list.fields.textpositions.RIGHT'),
        css: 'default'
    }];

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
                    if (angular.isDefined($scope.menu)) {
                        $scope.menu.creator_user = $scope.menu.creator_user || $scope.users[0].id;
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
            if ($scope.menu.id > 0) {
                $scope.disableSubmit = true;
                $menusDataFactory.update($scope.menu).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MENUUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MENUNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $menusDataFactory.create($scope.menu).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MENUCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MENUNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.settings.menus');
    };
    
    if (angular.isDefined($stateParams.id)) {
        $menusDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.menu = savable(data);
            });
        });
    } else {
        $scope.menu = {id: 0, mode: 'Link', display_mode: 'ImageWithText', text_position: 'None'};

    }

}]);

