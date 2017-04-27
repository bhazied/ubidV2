'use strict';

/**
 * Controller for Translation Physical Activities List
 */

app.controller('TranslationPhysicalActivitiesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$physicalActivitiesDataFactory', '$usersDataFactory', '$translationPhysicalActivitiesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $physicalActivitiesDataFactory, $usersDataFactory, $translationPhysicalActivitiesDataFactory) {


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

    $scope.physicalActivities = [];
    $scope.physicalActivitiesLoaded = false;

    $scope.getPhysicalActivities = function() {
        $scope.physicalActivitiesLoaded = true;
        if ($scope.physicalActivities.length == 0) {
            $scope.physicalActivities.push({id: '', title: $filter('translate')('content.form.messages.SELECTPHYSICALACTIVITY')});
            var def = $q.defer();
            $physicalActivitiesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[physicalActivity.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.physicalActivities.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.physicalActivities);
                    }
                });
            });
            return def;
        } else {
            return $scope.physicalActivities;
        }
    };

    $scope.getPhysicalActivities();

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
        $localStorage.translationPhysicalActivitiesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.translationPhysicalActivitiesParams)) {
           $localStorage.translationPhysicalActivitiesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.translationPhysicalActivitiesParams[param]) && $localStorage.translationPhysicalActivitiesParams[param] != null) {
            return $localStorage.translationPhysicalActivitiesParams[param];
        } else {
            $localStorage.translationPhysicalActivitiesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'translationPhysicalActivity.id', filter: { 'translationPhysicalActivity.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'physical_activity', 'class': 'has_one', title: $filter('translate')('content.list.fields.PHYSICALACTIVITY'), sortable: 'physical_activity.name', filter: { 'translationPhysicalActivity.physicalActivity': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPhysicalActivities(), show: ($scope.getParamValue('physical_activity_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.systemsettings.physicalactivitiesdetails' },
            { field: 'locale', title: $filter('translate')('content.list.fields.LOCALE'), sortable: 'translationPhysicalActivity.locale', filter: { 'translationPhysicalActivity.locale': 'text' }, show: ($scope.getParamValue('locale_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'translationPhysicalActivity.name', filter: { 'translationPhysicalActivity.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'athletic_name', title: $filter('translate')('content.list.fields.ATHLETICNAME'), sortable: 'translationPhysicalActivity.athleticName', filter: { 'translationPhysicalActivity.athleticName': 'text' }, show: ($scope.getParamValue('athletic_name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'validated', title: $filter('translate')('content.list.fields.VALIDATED'), sortable: 'translationPhysicalActivity.validated', filter: { 'translationPhysicalActivity.validated': 'select' }, show: ($scope.getParamValue('validated_show_filed', true) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.validated ]]"></span>') },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'translationPhysicalActivity.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_id_show_filed', true) && true), displayInList: true, displayField: 'username', state: 'app.accesscontrol.usersdetails' },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'translationPhysicalActivity.createdAt', filter: { 'translationPhysicalActivity.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'translationPhysicalActivity.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.accesscontrol.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'translationPhysicalActivity.modifiedAt', filter: { 'translationPhysicalActivity.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
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

    $scope.isFiltersVisible = $scope.getParamValue('translationPhysicalActivitiesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('translationPhysicalActivitiesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('translationPhysicalActivitiesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('translationPhysicalActivitiesCount', $scope.count);
    $scope.sorting = {'translationPhysicalActivity.locale': 'asc'};
    $scope.sorting = $scope.getParamValue('translationPhysicalActivitiesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('translationPhysicalActivitiesFilter', $scope.filter);
    $scope.setParamValue('translationPhysicalActivitiesPage', $scope.page);
    $scope.setParamValue('translationPhysicalActivitiesCount', $scope.count);
    $scope.setParamValue('translationPhysicalActivitiesSorting', $scope.sorting);
    $scope.setParamValue('translationPhysicalActivitiesFilter', $scope.filter);
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
            $scope.setParamValue('translationPhysicalActivitiesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('translationPhysicalActivitiesPage', current);
            $scope.setParamValue('translationPhysicalActivitiesCount', limit);
            $scope.setParamValue('translationPhysicalActivitiesSorting', order_by);
            $scope.setParamValue('translationPhysicalActivitiesFilter', filters);
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
            return $translationPhysicalActivitiesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTRANSLATIONPHYSICALACTIVITY'),
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
                $translationPhysicalActivitiesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.translation.translationphysicalactivitiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationphysicalactivitiesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.translation.translationphysicalactivitiesdetails', {id: row.id});
    };
}]);

