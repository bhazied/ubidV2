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
        id: 'Guest',
        title: $filter('translate')('content.list.fields.types.GUEST'),
        css: 'primary'
    }, {
        id: 'Buyer',
        title: $filter('translate')('content.list.fields.types.BUYER'),
        css: 'success'
    }, {
        id: 'Supplier',
        title: $filter('translate')('content.list.fields.types.SUPPLIER'),
        css: 'warning'
    }, {
        id: 'Both',
        title: $filter('translate')('content.list.fields.types.BOTH'),
        css: 'danger'
    }, {
        id: 'Administrator',
        title: $filter('translate')('content.list.fields.types.ADMINISTRATOR'),
        css: 'default'
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
        id: 'ROLE_SUBSCRIBER',
        title: $filter('translate')('content.list.fields.roles.ROLE_SUBSCRIBER'),
        css: 'success'
    }, {
        id: 'ROLE_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_ADMIN'),
        css: 'warning'
    }, {
        id: 'ROLE_CALL_CENTER',
        title: $filter('translate')('content.list.fields.roles.ROLE_CALL_CENTER'),
        css: 'danger'
    }, {
        id: 'ROLE_IT',
        title: $filter('translate')('content.list.fields.roles.ROLE_IT'),
        css: 'default'
    }, {
        id: 'ROLE_SUPER_ADMIN',
        title: $filter('translate')('content.list.fields.roles.ROLE_SUPER_ADMIN'),
        css: 'info'
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
            $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
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
            $languagesDataFactory.query({offset: 0, limit: 10000, 'order_by[language.id]': 'desc'}).$promise.then(function(data) {
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
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
            var def = $q.defer();
            $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
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
            $groupsDataFactory.query({offset: 0, limit: 10000, 'order_by[group.id]': 'desc'}).$promise.then(function(data) {
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
        var html = '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
        var displayFields = this.displayField.split(' ');
        for (var i in displayFields) {
            html += value[displayFields[i]] + ' ';
        }
        html += '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.linksValue = function($scope, row) {
        var values = row[this.field];
        if (values.length == 0) {
            return '';
        }
        var links = [];
        for (var i in values) {
            var link = '<a ui-sref="'+this.state+'({id: ' + values[i].id + '})">';
            var displayFields = this.displayField.split(' ');
            for (var j in displayFields) {
                link += value[displayFields[j]] + ' ';
            }
            html += '</a>';
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
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
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
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'user.id', filter: { 'user.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'user.createdAt', filter: { 'user.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'user.modifiedAt', filter: { 'user.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'user.address', filter: { 'user.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'user.companyName', filter: { 'user.companyName': 'text' }, show: $scope.getParamValue('company_name_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'credentials_expired', title: $filter('translate')('content.list.fields.CREDENTIALSEXPIRED'), sortable: 'user.credentialsExpired', filter: { 'user.credentialsExpired': 'select' }, show: $scope.getParamValue('credentials_expired_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.credentials_expired ]]"></span>') },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'user.email', filter: { 'user.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'enabled', title: $filter('translate')('content.list.fields.ENABLED'), sortable: 'user.enabled', filter: { 'user.enabled': 'select' }, show: $scope.getParamValue('enabled_show_filed', false), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_SUPER_ADMIN') > -1), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enabled ]]"></span>') },
            { field: 'expired', title: $filter('translate')('content.list.fields.EXPIRED'), sortable: 'user.expired', filter: { 'user.expired': 'select' }, show: $scope.getParamValue('expired_show_filed', false), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_SUPER_ADMIN') > -1), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.expired ]]"></span>') },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'user.firstName', filter: { 'user.firstName': 'text' }, show: $scope.getParamValue('first_name_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'gender', 'class': 'enum', title: $filter('translate')('content.list.fields.GENDER'), sortable: 'user.gender', filter: { 'user.gender': 'select' }, show: $scope.getParamValue('gender_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.gendersOptions, interpolateExpr: $interpolate('<span class="userGender" my-enum="[[ row.gender ]]" my-enum-list=\'[[ genders ]]\'></span>') },
            { field: 'job', title: $filter('translate')('content.list.fields.JOB'), sortable: 'user.job', filter: { 'user.job': 'text' }, show: $scope.getParamValue('job_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'user.lastName', filter: { 'user.lastName': 'text' }, show: $scope.getParamValue('last_name_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'locked', title: $filter('translate')('content.list.fields.LOCKED'), sortable: 'user.locked', filter: { 'user.locked': 'select' }, show: $scope.getParamValue('locked_show_filed', false), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_SUPER_ADMIN') > -1), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.locked ]]"></span>') },
            { field: 'password', title: $filter('translate')('content.list.fields.PASSWORD'), sortable: 'user.password', filter: { 'user.password': 'text' }, show: $scope.getParamValue('password_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'user.phone', filter: { 'user.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'user.picture', filter: { 'user.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'profile', title: $filter('translate')('content.list.fields.PROFILE'), sortable: 'user.profile', filter: { 'user.profile': 'text' }, show: $scope.getParamValue('profile_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'roles', title: $filter('translate')('content.list.fields.ROLES'), sortable: 'user.roles', filter: { 'user.roles': 'text' }, show: $scope.getParamValue('roles_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'salt', title: $filter('translate')('content.list.fields.SALT'), sortable: 'user.salt', filter: { 'user.salt': 'text' }, show: $scope.getParamValue('salt_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'type', 'class': 'enum', title: $filter('translate')('content.list.fields.TYPE'), sortable: 'user.type', filter: { 'user.type': 'select' }, show: $scope.getParamValue('type_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.typesOptions, interpolateExpr: $interpolate('<span class="userType" my-enum="[[ row.type ]]" my-enum-list=\'[[ types ]]\'></span>') },
            { field: 'username', title: $filter('translate')('content.list.fields.USERNAME'), sortable: 'user.username', filter: { 'user.username': 'text' }, show: $scope.getParamValue('username_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'user.zipCode', filter: { 'user.zipCode': 'text' }, show: $scope.getParamValue('zip_code_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'country', 'class': 'has_one', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'user.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', false), displayInList: true, displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'user.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'language', 'class': 'has_one', title: $filter('translate')('content.list.fields.LANGUAGE'), sortable: 'language.name', filter: { 'user.language': 'select' }, getValue: $scope.linkValue, filterData: $scope.getLanguages(), show: $scope.getParamValue('language_id_show_filed', false), displayInList: true, displayField: 'name', state: 'app.settings.languagesdetails' },
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'user.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'groups', 'class': 'has_nany', title: $filter('translate')('content.list.fields.GROUPS'), filter: { 'user.groups': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getGroups(), show: $scope.getParamValue('groups_show_filed', false), displayInList: true, display: false, displayField: 'name', state: 'app.access.groupsdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
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
    $scope.sorting = {'user.id': 'asc'};
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
        $state.go('app.access.usersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.usersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.access.usersdetails', {id: row.id});
    };
}]);

