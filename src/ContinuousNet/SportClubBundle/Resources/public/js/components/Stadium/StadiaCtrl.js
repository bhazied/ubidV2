'use strict';

/**
 * Controller for Stadia List
 */

app.controller('StadiaCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$sportEventsDataFactory', '$countriesDataFactory', '$citiesDataFactory', '$usersDataFactory', '$stadiaDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $sportEventsDataFactory, $countriesDataFactory, $citiesDataFactory, $usersDataFactory, $stadiaDataFactory) {


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

    $scope.sportEvents = [];
    $scope.sportEventsLoaded = false;

    $scope.getSportEvents = function() {
        $scope.sportEventsLoaded = true;
        if ($scope.sportEvents.length == 0) {
            $scope.sportEvents.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORTEVENT')});
            var def = $q.defer();
            $sportEventsDataFactory.query({offset: 0, limit: 10000, 'order_by[sportEvent.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.sportEvents.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sportEvents);
                    }
                });
            });
            return def;
        } else {
            return $scope.sportEvents;
        }
    };

    $scope.getSportEvents();

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
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.stadiaParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.stadiaParams)) {
           $localStorage.stadiaParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.stadiaParams[param]) && $localStorage.stadiaParams[param] != null) {
            return $localStorage.stadiaParams[param];
        } else {
            $localStorage.stadiaParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'stadium.id', filter: { 'stadium.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'sport_event', title: $filter('translate')('content.list.fields.SPORTEVENT'), sortable: 'sport_event.name', filter: { 'stadium.sportEvent': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSportEvents(), show: $scope.getParamValue('sport_event_id_show_filed', true), displayField: 'name', state: 'app.events.sporteventsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'stadium.name', filter: { 'stadium.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'stadium.nameAr', filter: { 'stadium.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'stadium.nameFr', filter: { 'stadium.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'stadium.picture', filter: { 'stadium.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', true), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'stadium.address', filter: { 'stadium.address': 'text' }, show: $scope.getParamValue('address_show_filed', true), getValue: $scope.textValue },
            { field: 'address_ar', title: $filter('translate')('content.list.fields.ADDRESSAR'), sortable: 'stadium.addressAr', filter: { 'stadium.addressAr': 'text' }, show: $scope.getParamValue('address_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'address_fr', title: $filter('translate')('content.list.fields.ADDRESSFR'), sortable: 'stadium.addressFr', filter: { 'stadium.addressFr': 'text' }, show: $scope.getParamValue('address_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'stadium.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', false), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'city.name', filter: { 'stadium.city': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCities(), show: $scope.getParamValue('city_id_show_filed', false), displayField: 'name', state: 'app.settings.citiesdetails' },
            { field: 'capacity', title: $filter('translate')('content.list.fields.CAPACITY'), sortable: 'stadium.capacity', filter: { 'stadium.capacity': 'number' }, show: $scope.getParamValue('capacity_show_filed', false), getValue: $scope.textValue },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'stadium.isPublished', filter: { 'stadium.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'latitude', title: $filter('translate')('content.list.fields.LATITUDE'), sortable: 'stadium.latitude', filter: { 'stadium.latitude': 'text' }, show: $scope.getParamValue('latitude_show_filed', false), getValue: $scope.textValue },
            { field: 'longitude', title: $filter('translate')('content.list.fields.LONGITUDE'), sortable: 'stadium.longitude', filter: { 'stadium.longitude': 'text' }, show: $scope.getParamValue('longitude_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'stadium.createdAt', filter: { 'stadium.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'stadium.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'stadium.modifiedAt', filter: { 'stadium.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'stadium.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('stadiaIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('stadiaIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('stadiaPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('stadiaCount', $scope.count);
    $scope.sorting = {'stadium.name': 'asc'};
    $scope.sorting = $scope.getParamValue('stadiaSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('stadiaFilter', $scope.filter);
    $scope.setParamValue('stadiaPage', $scope.page);
    $scope.setParamValue('stadiaCount', $scope.count);
    $scope.setParamValue('stadiaSorting', $scope.sorting);
    $scope.setParamValue('stadiaFilter', $scope.filter);
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
            $scope.setParamValue('stadiaIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('stadiaPage', current);
            $scope.setParamValue('stadiaCount', limit);
            $scope.setParamValue('stadiaSorting', order_by);
            $scope.setParamValue('stadiaFilter', filters);
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
            return $stadiaDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSTADIUM'),
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
                $stadiaDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.STADIUMDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.STADIUMNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.STADIUMNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.stadianew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.stadiaedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.stadiadetails', {id: row.id});
    };
}]);

