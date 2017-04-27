'use strict';

/**
 * Controller for User Form
 */

app.controller('UserFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$countriesDataFactory', '$languagesDataFactory', '$groupsDataFactory', '$usersDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $countriesDataFactory, $languagesDataFactory, $groupsDataFactory, $usersDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/users',
        filebrowserBrowseRouteParameters: {
            instance: 'data',
            homeFolder: 'users',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

    $scope.types = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'User',
        title: $filter('translate')('content.list.fields.types.USER'),
        css: 'primary'
    }, {
        id: 'Manager',
        title: $filter('translate')('content.list.fields.types.MANAGER'),
        css: 'success'
    }, {
        id: 'Administrator',
        title: $filter('translate')('content.list.fields.types.ADMINISTRATOR'),
        css: 'warning'
    }];
    $scope.genders = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'Male',
        title: $filter('translate')('content.list.fields.genders.MALE'),
        css: 'primary'
    }, {
        id: 'Female',
        title: $filter('translate')('content.list.fields.genders.FEMALE'),
        css: 'success'
    }];

    $scope.birthDateOpened = false;
    $scope.birthDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.birthDateOpened = !$scope.birthDateOpened;
    };
    $scope.authenticationModes = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'Database',
        title: $filter('translate')('content.list.fields.authenticationmodes.DATABASE'),
        css: 'primary'
    }, {
        id: 'ActiveDirectory',
        title: $filter('translate')('content.list.fields.authenticationmodes.ACTIVEDIRECTORY'),
        css: 'success'
    }, {
        id: 'Webservice',
        title: $filter('translate')('content.list.fields.authenticationmodes.WEBSERVICE'),
        css: 'warning'
    }];
    $scope.roles = [{
        id: 'ROLE_API',
        title: $filter('translate')('content.list.fields.rolesoptions.ROLE_API'),
        css: 'primary'
    }, {
        id: 'ROLE_ACCOUNT_MANAGER',
        title: $filter('translate')('content.list.fields.rolesoptions.ROLE_ACCOUNT_MANAGER'),
        css: 'success'
    }, {
        id: 'ROLE_ACCOUNT_USER',
        title: $filter('translate')('content.list.fields.rolesoptions.ROLE_ACCOUNT_USER'),
        css: 'warning'
    }, {
        id: 'ROLE_ADMIN',
        title: $filter('translate')('content.list.fields.rolesoptions.ROLE_ADMIN'),
        css: 'danger'
    }, {
        id: 'ROLE_SUPER_ADMIN',
        title: $filter('translate')('content.list.fields.rolesoptions.ROLE_SUPER_ADMIN'),
        css: 'default'
    }];

    $scope.passwordRequestedAtOpened = false;
    $scope.passwordRequestedAtToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.passwordRequestedAtOpened = !$scope.passwordRequestedAtOpened;
    };

    $scope.expiresAtOpened = false;
    $scope.expiresAtToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.expiresAtOpened = !$scope.expiresAtOpened;
    };

    $scope.credentialsExpireAtOpened = false;
    $scope.credentialsExpireAtToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.credentialsExpireAtOpened = !$scope.credentialsExpireAtOpened;
    };

    $scope.lastLoginOpened = false;
    $scope.lastLoginToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.lastLoginOpened = !$scope.lastLoginOpened;
    };

    $scope.lastFailedLoginOpened = false;
    $scope.lastFailedLoginToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.lastFailedLoginOpened = !$scope.lastFailedLoginOpened;
    };

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                var def = $q.defer();
                $countriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.countries = data.results;
                    def.resolve($scope.countries);
                    if (angular.isDefined($scope.user)) {
                        $scope.user.country = $scope.user.country || $scope.countries[0].id;
                    }
                });
                return def;
            } else {
                return $scope.countries;
            }
        });
    };

    $scope.getCountries();

    $scope.languages = [];
    $scope.languagesLoaded = false;

    $scope.getLanguages = function() {
        $timeout(function(){
            $scope.languagesLoaded = true;
            if ($scope.languages.length == 0) {
                $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
                var def = $q.defer();
                $languagesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[language.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.languages = data.results;
                    def.resolve($scope.languages);
                    if (angular.isDefined($scope.user)) {
                        $scope.user.language = $scope.user.language || $scope.languages[0].id;
                    }
                });
                return def;
            } else {
                return $scope.languages;
            }
        });
    };

    $scope.getLanguages();

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
                    if (angular.isDefined($scope.user)) {
                        $scope.user.creator_user = $scope.user.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();

    $scope.groups = [];
    $scope.groupsLoaded = [];

    $scope.getGroups = function() {
        $timeout(function(){
            if ($scope.groups.length == 0) {
                $scope.groups.push({});
                var def = $q.defer();
                $groupsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[group.name]': 'asc'}).$promise.then(function(data) {
                    $scope.groups = data.results;
                    def.resolve($scope.groups);
                });
                return def;
            } else {
                return $scope.groups;
            }
        });
    };

    $scope.getGroups();

    $scope.groupsSearchText = '';
    $scope.userGroups = false;
    $scope.$watch('userGroups', function() {
        if (angular.isDefined($scope.user)) {
            var groups = $filter('filter')($scope.groups, $scope.groupsSearchText);
            if ($scope.userGroups) {
                for (var i in groups) {
                    var id = groups[i].id;
                    var index = $scope.user.groups.indexOf(id);
                    if (index == -1) {
                        $scope.user.groups.push(id);
                    }
                }
            } else {
                for (var i in groups) {
                    var id = groups[i].id;
                    var index = $scope.user.groups.indexOf(id);
                    if (index > -1) {
                        $scope.user.groups.splice(index, 1);
                    }
                }
            }
        }
    });

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
            if ($scope.user.id > 0) {
                $scope.disableSubmit = true;
                $usersDataFactory.update($scope.user).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.USERUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.USERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $usersDataFactory.create($scope.user).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.USERCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.USERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.accesscontrol.users');
    };
    
    $scope.user_country_readonly = false;
    $scope.user_language_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $usersDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.user = savable(data);
                if ($scope.user.birth_date != null) {
                    $scope.user.birth_date = new Date($scope.user.birth_date);
                }
                if ($scope.user.password_requested_at != null) {
                    $scope.user.password_requested_at = new Date($scope.user.password_requested_at);
                }
                if ($scope.user.expires_at != null) {
                    $scope.user.expires_at = new Date($scope.user.expires_at);
                }
                if ($scope.user.credentials_expire_at != null) {
                    $scope.user.credentials_expire_at = new Date($scope.user.credentials_expire_at);
                }
                if ($scope.user.last_login != null) {
                    $scope.user.last_login = new Date($scope.user.last_login);
                }
                if ($scope.user.last_failed_login != null) {
                    $scope.user.last_failed_login = new Date($scope.user.last_failed_login);
                }
            });
        });
    } else {
        $scope.user = {id: 0, type: 'User', gender: 'Male', authentication_mode: 'Database', groups: []};

        if (angular.isDefined($stateParams.user_country) && JSON.parse($stateParams.user_country) != null) {
            $scope.user.country = $stateParams.user_country;
            $scope.user_country_readonly = true;
        }
        if (angular.isDefined($stateParams.user_language) && JSON.parse($stateParams.user_language) != null) {
            $scope.user.language = $stateParams.user_language;
            $scope.user_language_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/livnyou/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.user[field];
                },
                instance: function() {
                    return 'data';
                },
                folder: function() {
                    var user_id = '000000' + $localStorage.user.id;
                    var user_dir = 'user_' + user_id.substr(user_id.length - 6);
                    return user_dir;
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.user[field] = url;
        }, function () {
            
        });
    
    };

}]);

