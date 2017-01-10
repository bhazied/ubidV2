'use strict';

/**
 * Controller for User Form
 */

app.controller('RegisterCtrl', ['$scope','$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$countriesDataFactory', '$languagesDataFactory', '$groupsDataFactory', '$usersDataFactory','$registerDataFactory','$http','DIAL_COUNTRIES',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $countriesDataFactory, $languagesDataFactory, $groupsDataFactory, $usersDataFactory, $registerDataFactory, $http, DIAL_COUNTRIES) {
        $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.disableSubmit = false;
        $scope.registerSuccess = false;
        // Editor options.
        $scope.editorOptions = {
            language: $scope.locale,
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReadyEditor = function () {

        };

        $scope.genders = [{
            id: 'Male',
            title: $filter('translate')('content.list.fields.genders.MALE'),
            css: 'primary'
        }, {
            id: 'Female',
            title: $filter('translate')('content.list.fields.genders.FEMALE'),
            css: 'success'
        }];
        $scope.authenticationModes = [{
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
        $scope.roles = {
            id: 'ROLE_SUBSCRIBER',
            title: $filter('translate')('content.list.fields.rolesoptions.ROLE_SUBSCRIBER'),
            css: 'success'
        };

        $scope.types = [{
            id: 'Buyer',
            title: $filter('translate')('content.list.fields.types.BUYER')
        },{
            id: 'Supplier',
            title: $filter('translate')('content.list.fields.types.SUPPLIER')
        },{
            id: 'Both',
            title: $filter('translate')('content.list.fields.types.BOTH')
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
        $scope.minDate = new Date(2010, 0, 1);
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
                    $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                        }
                        $scope.countries = data.results;
                        def.resolve($scope.countries);
                    });
                    return def;
                } else {
                    return $scope.countries;
                }
            });
        };

        $scope.getCountries();

        $scope.changeCountry = function() {
            angular.forEach($scope.dialCountries, function (value, key) {
                if(value.code == $scope.user.countryChoise.code){
                    $scope.user.phone = value.dial_code;
                }
            });
        };

        $scope.languages = [];
        $scope.languagesLoaded = false;

        $scope.getLanguages = function() {
            $timeout(function(){
                $scope.languagesLoaded = true;
                if ($scope.languages.length == 0) {
                    $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
                    var def = $q.defer();
                    $languagesDataFactory.query({offset: 0, limit: 10000, 'order_by[language.name]': 'asc'}).$promise.then(function(data) {
                        var index = 0;
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                            if (data.results[i].code == $localStorage.language) {
                                index = i;
                            }
                        }
                        $scope.languages = data.results;

                        $scope.user.language = $scope.languages[index];
                        def.resolve($scope.languages);
                    });
                    return def;
                } else {
                    return $scope.languages;
                }
            });
        };

        $scope.getLanguages();

        $scope.users = [];

        $scope.disableSubmit = false;
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
                return false;
            } else {
                $scope.disableSubmit = true;
                $scope.user.country = $scope.user.countryChoise.id;
                $scope.user.locale = $localStorage.language;
                $scope.current_type = $stateParams.type;
                $registerDataFactory.register($scope.user).$promise.then(function(data){
                   if(data.status == true){
                       $scope.registerSuccess = true;
                   }else{
                       toaster.pop('error', $filter('translate')('title.error.SUBSCRIBTION'), data.message);
                       $scope.disableSubmit = false;
                       return false;
                   }
                });
            }
        };



        if (angular.isDefined($stateParams.id)) {
            $usersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
                $timeout(function(){
                    $scope.user = savable(data);
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
            $scope.user = { gender: 'Male', type: $stateParams.type};

        }

        $scope.showFileManager = function(field) {

            var modalInstance = $uibModal.open({
                templateUrl: '/bundles/ubidelectricity/js/common/FileManager/modal_content.html',
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
                        return 'default';
                    },
                    folder: function() {
                        var user_ = '00000' + $scope.user.id;
                        user_ = '/user_'+user_.substr(user_.length - 5);
                        return 'users'+user_;
                    }
                }
            });

            modalInstance.result.then(function (url) {
                $scope.user[field] = url;
            }, function () {

            });

        };

        $scope.dialCountries = [];
        $scope.getDialCountries = function () {
            if($scope.dialCountries.length == 0){
                var def = $q.defer();
                $http.get(DIAL_COUNTRIES).then(function (response) {
                    $scope.dialCountries = response.data;
                });
                return def.resolve($scope.dialCountries);
            }
            else{
                return $scope.dialCountries;
            }
        }
        $scope.getDialCountries();
    }]);

