'use strict';

/**
 * Controller for Stores List
 */

app.controller('StoresCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$countriesDataFactory', '$citiesDataFactory', '$usersDataFactory', '$storesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $countriesDataFactory, $citiesDataFactory, $usersDataFactory, $storesDataFactory) {

    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
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

    $scope.cities = [];
    $scope.citiesLoaded = false;

    $scope.getCities = function() {
        $scope.citiesLoaded = true;
        if ($scope.cities.length == 0) {
            $scope.cities.push({id: '', title: $filter('translate')('content.form.messages.SELECTCITY')});
            var def = $q.defer();
            $citiesDataFactory.query({offset: 0, limit: 10000, 'order_by[city.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.cities.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.cities);
                    }
                });
            });
            return def;
        } else {
            return $scope.cities;
        }
    };

    $scope.getCities();

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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.storesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.storesParams)) {
           $localStorage.storesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.storesParams[param]) && $localStorage.storesParams[param] != null) {
            return $localStorage.storesParams[param];
        } else {
            $localStorage.storesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'store.id', filter: { 'store.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'store.name', filter: { 'store.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'store.nameAr', filter: { 'store.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'store.nameFr', filter: { 'store.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'store.address', filter: { 'store.address': 'text' }, show: $scope.getParamValue('address_show_filed', true), getValue: $scope.textValue },
            { field: 'address_ar', title: $filter('translate')('content.list.fields.ADDRESSAR'), sortable: 'store.addressAr', filter: { 'store.addressAr': 'text' }, show: $scope.getParamValue('address_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'address_fr', title: $filter('translate')('content.list.fields.ADDRESSFR'), sortable: 'store.addressFr', filter: { 'store.addressFr': 'text' }, show: $scope.getParamValue('address_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'store.zipCode', filter: { 'store.zipCode': 'text' }, show: $scope.getParamValue('zip_code_show_filed', false), getValue: $scope.textValue },
            { field: 'location', title: $filter('translate')('content.list.fields.LOCATION'), sortable: 'store.location', filter: { 'store.location': 'text' }, show: $scope.getParamValue('location_show_filed', false), getValue: $scope.textValue },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'store.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', false), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'city.name', filter: { 'store.city': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCities(), show: $scope.getParamValue('city_id_show_filed', false), displayField: 'name', state: 'app.settings.citiesdetails' },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'store.phone', filter: { 'store.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), getValue: $scope.textValue },
            { field: 'fax', title: $filter('translate')('content.list.fields.FAX'), sortable: 'store.fax', filter: { 'store.fax': 'text' }, show: $scope.getParamValue('fax_show_filed', false), getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'store.email', filter: { 'store.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'store.picture', filter: { 'store.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'store.createdAt', filter: { 'store.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'store.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'store.modifiedAt', filter: { 'store.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'store.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('storesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('storesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('storesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('storesCount', $scope.count);
    $scope.sorting = {'store.name': 'asc'};
    $scope.sorting = $scope.getParamValue('storesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('storesFilter', $scope.filter);
    $scope.setParamValue('storesPage', $scope.page);
    $scope.setParamValue('storesCount', $scope.count);
    $scope.setParamValue('storesSorting', $scope.sorting);
    $scope.setParamValue('storesFilter', $scope.filter);
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
            $scope.setParamValue('storesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('storesPage', current);
            $scope.setParamValue('storesCount', limit);
            $scope.setParamValue('storesSorting', order_by);
            $scope.setParamValue('storesFilter', filters);
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
            return $storesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSTORE'),
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
                $storesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.STOREDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.STORENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.STORENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.storelocator.storesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.storelocator.storesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.storelocator.storesdetails', {id: row.id});
    };
}]);

