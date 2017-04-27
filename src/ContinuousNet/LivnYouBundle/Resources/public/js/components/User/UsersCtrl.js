'use strict';

/**
 * Controller for Users List
 */

app.controller('UsersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$countriesDataFactory', '$languagesDataFactory', '$groupsDataFactory', '$usersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $countriesDataFactory, $languagesDataFactory, $groupsDataFactory, $usersDataFactory) {

    $scope.typesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
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
    $scope.gendersOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Male',
        title: $filter('translate')('content.list.fields.genders.MALE'),
        css: 'primary'
    }, {
        id: 'Female',
        title: $filter('translate')('content.list.fields.genders.FEMALE'),
        css: 'success'
    }];
    $scope.authenticationModesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
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
    $scope.rolesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'ROLE_API',
        title: $filter('translate')('content.list.fields.roles.ROLE_API'),
        css: 'primary'
    }, {
        id: 'ROLE_ACCOUNT_MANAGER',
        title: $filter('translate')('content.list.fields.roles.ROLE_ACCOUNT_MANAGER'),
        css: 'success'
    }, {
        id: 'ROLE_ACCOUNT_USER',
        title: $filter('translate')('content.list.fields.roles.ROLE_ACCOUNT_USER'),
        css: 'warning'
    }, {
        id: 'ROLE_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_ADMIN'),
        css: 'danger'
    }, {
        id: 'ROLE_SUPER_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_SUPER_ADMIN'),
        css: 'default'
    }];

    $scope.booleanOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
     }, {
        id: '1',
        title: $filter('translate')('content.common.YES'),
        css: 'success'
     }, {
        id: '0',
        title: $filter('translate')('content.common.NO'),
        css: 'danger'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $scope.countriesLoaded = true;
        if ($scope.countries.length == 0) {
            $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
            var def = $q.defer();
            $countriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.countries.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.countries);
                    }
                });
            });
            return def;
        } else {
            return $scope.countries;
        }
    };

    $scope.getCountries();

    $scope.languages = [];
    $scope.languagesLoaded = false;

    $scope.getLanguages = function() {
        $scope.languagesLoaded = true;
        if ($scope.languages.length == 0) {
            $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
            var def = $q.defer();
            $languagesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[language.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.languages.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.languages);
                    }
                });
            });
            return def;
        } else {
            return $scope.languages;
        }
    };

    $scope.getLanguages();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
            var def = $q.defer();
            $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.users.push({
                                id: data.results[i].id,
                                title: data.results[i].username
                            });
                        }
                        def.resolve($scope.users);
                    }
                });
            });
            return def;
        } else {
            return $scope.users;
        }
    };

    $scope.getUsers();


    $scope.groups = [];
    $scope.groupsLoaded = [];

    $scope.getGroups = function() {
        if ($scope.groups.length == 0) {
            $scope.groups.push({});
            var def = $q.defer();
            $groupsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[group.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.groups.length = 0;
                        for (var i in data.results) {
                            $scope.groups.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.groups);
                    }
                });
            });
            return def;
        } else {
            return $scope.groups;
        }
    };

    $scope.getGroups();

    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var displayFields = this.displayField.split(' ');
        var displayText = ''
        for (var i in displayFields) {
            if (angular.isDefined(value[displayFields[i]])) {
                displayText += value[displayFields[i]] + ' ';
            }
        }
        var html = '';
        if ($rootScope.checkStatePermission(this.state)) {
            html += '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
            html += displayText.trim();
            html += '</a>';
        } else {
            html += displayText.trim();
        }
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.linksValue = function($scope, row) {
        var values = row[this.field];
        if (values.length == 0) {
            return '';
        }
        var links = [];
        for (var i in values) {
            var link = '';
            if ($rootScope.checkStatePermission(this.state)) {
                link += '<a ui-sref="'+this.state+'({id: ' + values[i].id + '})">';
            }
            var displayFields = this.displayField.split(' ');
            for (var j in displayFields) {
                if (angular.isDefined(values[i][displayFields[j]])) {
                    link += values[i][displayFields[j]] + ' ';
                }
            }
            link = link.trim();
            if ($rootScope.checkStatePermission(this.state)) {
                link += '</a>';
            }
            links.push(link);
        }
        var html = links.join(', ');
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var evaluatedValue = $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
        if (this.field == 'birth_date') {
            evaluatedValue += ' ('+$scope.$eval('\'' + value + '\' | age')+')';
        }
        return evaluatedValue;
    };

    $scope.interpolatedValue = function($scope, row) {
        return this.interpolateExpr({
            row: row,
            types: $scope.typesOptions,
            genders: $scope.gendersOptions,
            authenticationModes: $scope.authenticationModesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.usersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.usersParams)) {
           $localStorage.usersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.usersParams[param]) && $localStorage.usersParams[param] != null) {
            return $localStorage.usersParams[param];
        } else {
            $localStorage.usersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'user.id', filter: { 'user.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'type', 'class': 'enum', title: $filter('translate')('content.list.fields.TYPE'), sortable: 'user.type', filter: { 'user.type': 'select' }, show: ($scope.getParamValue('type_show_filed', true) && ($rootScope.currentUser.roles.join('').indexOf('SUP') > -1)), displayInList: ($rootScope.currentUser.roles.join('').indexOf('SUP') > -1), getValue: $scope.interpolatedValue, filterData : $scope.typesOptions, interpolateExpr: $interpolate('<span class="userType" my-enum="[[ row.type ]]" my-enum-list=\'[[ types ]]\'></span>') },
            { field: 'username', title: $filter('translate')('content.list.fields.USERNAME'), sortable: 'user.username', filter: { 'user.username': 'text' }, show: ($scope.getParamValue('username_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'password', title: $filter('translate')('content.list.fields.PASSWORD'), sortable: 'user.password', filter: { 'user.password': 'text' }, show: ($scope.getParamValue('password_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'salt', title: $filter('translate')('content.list.fields.SALT'), sortable: 'user.salt', filter: { 'user.salt': 'text' }, show: ($scope.getParamValue('salt_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'user.phone', filter: { 'user.phone': 'text' }, show: ($scope.getParamValue('phone_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'user.email', filter: { 'user.email': 'text' }, show: ($scope.getParamValue('email_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'username_canonical', title: $filter('translate')('content.list.fields.USERNAMECANONICAL'), sortable: 'user.usernameCanonical', filter: { 'user.usernameCanonical': 'text' }, show: ($scope.getParamValue('username_canonical_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'email_canonical', title: $filter('translate')('content.list.fields.EMAILCANONICAL'), sortable: 'user.emailCanonical', filter: { 'user.emailCanonical': 'text' }, show: ($scope.getParamValue('email_canonical_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'gender', 'class': 'enum', title: $filter('translate')('content.list.fields.GENDER'), sortable: 'user.gender', filter: { 'user.gender': 'select' }, show: ($scope.getParamValue('gender_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.gendersOptions, interpolateExpr: $interpolate('<span class="userGender" my-enum="[[ row.gender ]]" my-enum-list=\'[[ genders ]]\'></span>') },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'user.firstName', filter: { 'user.firstName': 'text' }, show: ($scope.getParamValue('first_name_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'user.lastName', filter: { 'user.lastName': 'text' }, show: ($scope.getParamValue('last_name_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'birth_date', title: $filter('translate')('content.list.fields.BIRTHDATE'), sortable: 'user.birthDate', filter: { 'user.birthDate': 'text' }, show: ($scope.getParamValue('birth_date_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'user.picture', filter: { 'user.picture': 'text' }, show: ($scope.getParamValue('picture_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'user.address', filter: { 'user.address': 'text' }, show: ($scope.getParamValue('address_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'user.zipCode', filter: { 'user.zipCode': 'text' }, show: ($scope.getParamValue('zip_code_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'user.companyName', filter: { 'user.companyName': 'text' }, show: ($scope.getParamValue('company_name_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'job', title: $filter('translate')('content.list.fields.JOB'), sortable: 'user.job', filter: { 'user.job': 'text' }, show: ($scope.getParamValue('job_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'city_name', title: $filter('translate')('content.list.fields.CITYNAME'), sortable: 'user.cityName', filter: { 'user.cityName': 'text' }, show: ($scope.getParamValue('city_name_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'country', 'class': 'has_one', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'user.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: ($scope.getParamValue('country_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.systemsettings.countriesdetails' },
            { field: 'language', 'class': 'has_one', title: $filter('translate')('content.list.fields.LANGUAGE'), sortable: 'language.name', filter: { 'user.language': 'select' }, getValue: $scope.linkValue, filterData: $scope.getLanguages(), show: ($scope.getParamValue('language_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.translation.languagesdetails' },
            { field: 'enable_oauth', title: $filter('translate')('content.list.fields.ENABLEOAUTH'), sortable: 'user.enableOauth', filter: { 'user.enableOauth': 'select' }, show: ($scope.getParamValue('enable_oauth_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_oauth ]]"></span>') },
            { field: 'session_timeout', title: $filter('translate')('content.list.fields.SESSIONTIMEOUT'), sortable: 'user.sessionTimeout', filter: { 'user.sessionTimeout': 'number' }, show: ($scope.getParamValue('session_timeout_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'multiple_session', title: $filter('translate')('content.list.fields.MULTIPLESESSION'), sortable: 'user.multipleSession', filter: { 'user.multipleSession': 'select' }, show: ($scope.getParamValue('multiple_session_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.multiple_session ]]"></span>') },
            { field: 'phone_validated', title: $filter('translate')('content.list.fields.PHONEVALIDATED'), sortable: 'user.phoneValidated', filter: { 'user.phoneValidated': 'select' }, show: ($scope.getParamValue('phone_validated_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.phone_validated ]]"></span>') },
            { field: 'phone_validation_code', title: $filter('translate')('content.list.fields.PHONEVALIDATIONCODE'), sortable: 'user.phoneValidationCode', filter: { 'user.phoneValidationCode': 'text' }, show: ($scope.getParamValue('phone_validation_code_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'email_validated', title: $filter('translate')('content.list.fields.EMAILVALIDATED'), sortable: 'user.emailValidated', filter: { 'user.emailValidated': 'select' }, show: ($scope.getParamValue('email_validated_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.email_validated ]]"></span>') },
            { field: 'email_validation_code', title: $filter('translate')('content.list.fields.EMAILVALIDATIONCODE'), sortable: 'user.emailValidationCode', filter: { 'user.emailValidationCode': 'text' }, show: ($scope.getParamValue('email_validation_code_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'authentication_mode', 'class': 'enum', title: $filter('translate')('content.list.fields.AUTHENTICATIONMODE'), sortable: 'user.authenticationMode', filter: { 'user.authenticationMode': 'select' }, show: ($scope.getParamValue('authentication_mode_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.authenticationModesOptions, interpolateExpr: $interpolate('<span class="userAuthenticationMode" my-enum="[[ row.authentication_mode ]]" my-enum-list=\'[[ authenticationModes ]]\'></span>') },
            { field: 'roles', title: $filter('translate')('content.list.fields.ROLES'), sortable: 'user.roles', filter: { 'user.roles': 'text' }, show: ($scope.getParamValue('roles_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'enabled', title: $filter('translate')('content.list.fields.ENABLED'), sortable: 'user.enabled', filter: { 'user.enabled': 'select' }, show: ($scope.getParamValue('enabled_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enabled ]]"></span>') },
            { field: 'confirmation_token', title: $filter('translate')('content.list.fields.CONFIRMATIONTOKEN'), sortable: 'user.confirmationToken', filter: { 'user.confirmationToken': 'text' }, show: ($scope.getParamValue('confirmation_token_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'password_requested_at', title: $filter('translate')('content.list.fields.PASSWORDREQUESTEDAT'), sortable: 'user.passwordRequestedAt', filter: { 'user.passwordRequestedAt': 'text' }, show: ($scope.getParamValue('password_requested_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'locked', title: $filter('translate')('content.list.fields.LOCKED'), sortable: 'user.locked', filter: { 'user.locked': 'select' }, show: ($scope.getParamValue('locked_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.locked ]]"></span>') },
            { field: 'expired', title: $filter('translate')('content.list.fields.EXPIRED'), sortable: 'user.expired', filter: { 'user.expired': 'select' }, show: ($scope.getParamValue('expired_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.expired ]]"></span>') },
            { field: 'expires_at', title: $filter('translate')('content.list.fields.EXPIRESAT'), sortable: 'user.expiresAt', filter: { 'user.expiresAt': 'text' }, show: ($scope.getParamValue('expires_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'credentials_expired', title: $filter('translate')('content.list.fields.CREDENTIALSEXPIRED'), sortable: 'user.credentialsExpired', filter: { 'user.credentialsExpired': 'select' }, show: ($scope.getParamValue('credentials_expired_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.credentials_expired ]]"></span>') },
            { field: 'credentials_expire_at', title: $filter('translate')('content.list.fields.CREDENTIALSEXPIREAT'), sortable: 'user.credentialsExpireAt', filter: { 'user.credentialsExpireAt': 'text' }, show: ($scope.getParamValue('credentials_expire_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'last_login', title: $filter('translate')('content.list.fields.LASTLOGIN'), sortable: 'user.lastLogin', filter: { 'user.lastLogin': 'text' }, show: ($scope.getParamValue('last_login_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'last_failed_login', title: $filter('translate')('content.list.fields.LASTFAILEDLOGIN'), sortable: 'user.lastFailedLogin', filter: { 'user.lastFailedLogin': 'text' }, show: ($scope.getParamValue('last_failed_login_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'login_count', title: $filter('translate')('content.list.fields.LOGINCOUNT'), sortable: 'user.loginCount', filter: { 'user.loginCount': 'number' }, show: ($scope.getParamValue('login_count_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'failed_login_count', title: $filter('translate')('content.list.fields.FAILEDLOGINCOUNT'), sortable: 'user.failedLoginCount', filter: { 'user.failedLoginCount': 'number' }, show: ($scope.getParamValue('failed_login_count_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'last_failed_login_count', title: $filter('translate')('content.list.fields.LASTFAILEDLOGINCOUNT'), sortable: 'user.lastFailedLoginCount', filter: { 'user.lastFailedLoginCount': 'number' }, show: ($scope.getParamValue('last_failed_login_count_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'user.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.accesscontrol.usersdetails' },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'user.createdAt', filter: { 'user.createdAt': 'number' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'user.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.accesscontrol.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'user.modifiedAt', filter: { 'user.modifiedAt': 'number' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'groups', 'class': 'has_nany', title: $filter('translate')('content.list.fields.GROUPS'), filter: { 'user.groups': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getGroups(), show: ($scope.getParamValue('groups_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.accesscontrol.groupsdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('usersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('usersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('usersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('usersCount', $scope.count);
    $scope.sorting = {'user.email': 'asc'};
    $scope.sorting = $scope.getParamValue('usersSorting', $scope.sorting);
    $scope.filter = {
        groups: []
    };
    $scope.filter = $scope.getParamValue('usersFilter', $scope.filter);
    $scope.setParamValue('usersPage', $scope.page);
    $scope.setParamValue('usersCount', $scope.count);
    $scope.setParamValue('usersSorting', $scope.sorting);
    $scope.setParamValue('usersFilter', $scope.filter);
    $scope.tableParams = {
        page: $scope.page,
        count: $scope.count,
        sorting: $scope.sorting,
        filter: $scope.filter
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('usersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('usersPage', current);
            $scope.setParamValue('usersCount', limit);
            $scope.setParamValue('usersSorting', order_by);
            $scope.setParamValue('usersFilter', filters);
            var http_params = {
                locale: $localStorage.language,
                offset: offset,
                limit: limit
            };
            for (var field in order_by) {
                http_params['order_by['+field+']'] = order_by[field];
            }
            if (filters.length > 0) {
                http_params.offset = 0;
            }
            for (var field in filters) {
                if (filters[field] != null || filters[field] != '') {
                    http_params['filters['+field+']'] = filters[field];
                }
            }
            $scope.isLoading = true;
            return $usersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERUSER'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $filter('translate')('content.common.YESDELETE'),
            cancelButtonText: $filter('translate')('content.common.NOCANCEL'),
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                $usersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.USERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.USERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.USERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.accesscontrol.usersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.accesscontrol.usersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.accesscontrol.usersdetails', {id: row.id});
    };
}]);

