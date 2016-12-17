'use strict';

/**
 * Controller for Teams List
 */

app.controller('TeamsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$countriesDataFactory', '$stadiaDataFactory', '$usersDataFactory', '$teamsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $countriesDataFactory, $stadiaDataFactory, $usersDataFactory, $teamsDataFactory) {

    $scope.teamTypesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Club',
        title: $filter('translate')('content.list.fields.teamtypes.CLUB'),
        css: 'primary'
    }, {
        id: 'National',
        title: $filter('translate')('content.list.fields.teamtypes.NATIONAL'),
        css: 'success'
    }];
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

    $scope.stadia = [];
    $scope.stadiaLoaded = false;

    $scope.getStadia = function() {
        $scope.stadiaLoaded = true;
        if ($scope.stadia.length == 0) {
            $scope.stadia.push({id: '', title: $filter('translate')('content.form.messages.SELECTSTADIUM')});
            var def = $q.defer();
            $stadiaDataFactory.query({offset: 0, limit: 10000, 'order_by[stadium.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.stadia.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.stadia);
                    }
                });
            });
            return def;
        } else {
            return $scope.stadia;
        }
    };

    $scope.getStadia();

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

    $scope.colorValue = function($scope, row) {
        var color = $scope.$eval('row.' + this.field);
        var html = '<b style="color: white; background-color: ' + color + ';">' + color + '</b>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
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
            teamTypes: $scope.teamTypesOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.teamsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.teamsParams)) {
           $localStorage.teamsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.teamsParams[param]) && $localStorage.teamsParams[param] != null) {
            return $localStorage.teamsParams[param];
        } else {
            $localStorage.teamsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'team.id', filter: { 'team.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'team.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', true), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'team.name', filter: { 'team.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'team.nameAr', filter: { 'team.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'team.nameFr', filter: { 'team.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'alias', title: $filter('translate')('content.list.fields.ALIAS'), sortable: 'team.alias', filter: { 'team.alias': 'text' }, show: $scope.getParamValue('alias_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'team.picture', filter: { 'team.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', true), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'president_name', title: $filter('translate')('content.list.fields.PRESIDENTNAME'), sortable: 'team.presidentName', filter: { 'team.presidentName': 'text' }, show: $scope.getParamValue('president_name_show_filed', false), getValue: $scope.textValue },
            { field: 'coach_name', title: $filter('translate')('content.list.fields.COACHNAME'), sortable: 'team.coachName', filter: { 'team.coachName': 'text' }, show: $scope.getParamValue('coach_name_show_filed', false), getValue: $scope.textValue },
            { field: 'fondation_year', title: $filter('translate')('content.list.fields.FONDATIONYEAR'), sortable: 'team.fondationYear', filter: { 'team.fondationYear': 'number' }, show: $scope.getParamValue('fondation_year_show_filed', false), getValue: $scope.textValue },
            { field: 'stadium', title: $filter('translate')('content.list.fields.STADIUM'), sortable: 'stadium.name', filter: { 'team.stadium': 'select' }, getValue: $scope.linkValue, filterData: $scope.getStadia(), show: $scope.getParamValue('stadium_id_show_filed', false), displayField: 'name', state: 'app.events.stadiadetails' },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'team.address', filter: { 'team.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'team.zipCode', filter: { 'team.zipCode': 'text' }, show: $scope.getParamValue('zip_code_show_filed', false), getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'team.phone', filter: { 'team.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), getValue: $scope.textValue },
            { field: 'fax', title: $filter('translate')('content.list.fields.FAX'), sortable: 'team.fax', filter: { 'team.fax': 'text' }, show: $scope.getParamValue('fax_show_filed', false), getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'team.email', filter: { 'team.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), getValue: $scope.textValue },
            { field: 'website', title: $filter('translate')('content.list.fields.WEBSITE'), sortable: 'team.website', filter: { 'team.website': 'text' }, show: $scope.getParamValue('website_show_filed', false), getValue: $scope.textValue },
            { field: 'color', title: $filter('translate')('content.list.fields.COLOR'), sortable: 'team.color', filter: { 'team.color': 'text' }, show: $scope.getParamValue('color_show_filed', false), getValue: $scope.colorValue },
            { field: 'team_type', title: $filter('translate')('content.list.fields.TEAMTYPE'), sortable: 'team.teamType', filter: { 'team.teamType': 'select' }, show: $scope.getParamValue('team_type_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.teamTypesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.team_type ]]" my-enum-list=\'[[ teamTypes ]]\'></span>') },
            { field: 'summary', title: $filter('translate')('content.list.fields.SUMMARY'), sortable: 'team.summary', filter: { 'team.summary': 'text' }, show: $scope.getParamValue('summary_show_filed', false), getValue: $scope.textValue },
            { field: 'eurosport', title: $filter('translate')('content.list.fields.EUROSPORT'), sortable: 'team.eurosport', filter: { 'team.eurosport': 'text' }, show: $scope.getParamValue('eurosport_show_filed', false), getValue: $scope.textValue },
            { field: 'lequipe', title: $filter('translate')('content.list.fields.LEQUIPE'), sortable: 'team.lequipe', filter: { 'team.lequipe': 'text' }, show: $scope.getParamValue('lequipe_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'team.createdAt', filter: { 'team.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'team.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'team.modifiedAt', filter: { 'team.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'team.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('teamsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('teamsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('teamsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('teamsCount', $scope.count);
    $scope.sorting = {'team.name': 'asc'};
    $scope.sorting = $scope.getParamValue('teamsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('teamsFilter', $scope.filter);
    $scope.setParamValue('teamsPage', $scope.page);
    $scope.setParamValue('teamsCount', $scope.count);
    $scope.setParamValue('teamsSorting', $scope.sorting);
    $scope.setParamValue('teamsFilter', $scope.filter);
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
            $scope.setParamValue('teamsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('teamsPage', current);
            $scope.setParamValue('teamsCount', limit);
            $scope.setParamValue('teamsSorting', order_by);
            $scope.setParamValue('teamsFilter', filters);
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
            return $teamsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTEAM'),
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
                $teamsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TEAMDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TEAMNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TEAMNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.teamsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.teamsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.teamsdetails', {id: row.id});
    };
}]);

