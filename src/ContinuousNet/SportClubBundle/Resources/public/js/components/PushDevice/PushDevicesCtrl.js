'use strict';

/**
 * Controller for Push Devices List
 */

app.controller('PushDevicesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$pushDevicesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $pushDevicesDataFactory) {

    $scope.developmentsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Production',
        title: $filter('translate')('content.list.fields.developments.PRODUCTION'),
        css: 'primary'
    }, {
        id: 'Sandbox',
        title: $filter('translate')('content.list.fields.developments.SANDBOX'),
        css: 'success'
    }];
    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Uninstalled',
        title: $filter('translate')('content.list.fields.statuses.UNINSTALLED'),
        css: 'success'
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
            developments: $scope.developmentsOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.pushDevicesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.pushDevicesParams)) {
           $localStorage.pushDevicesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.pushDevicesParams[param]) && $localStorage.pushDevicesParams[param] != null) {
            return $localStorage.pushDevicesParams[param];
        } else {
            $localStorage.pushDevicesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'pushDevice.id', filter: { 'pushDevice.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'app_name', title: $filter('translate')('content.list.fields.APPNAME'), sortable: 'pushDevice.appName', filter: { 'pushDevice.appName': 'text' }, show: $scope.getParamValue('app_name_show_filed', true), getValue: $scope.textValue },
            { field: 'app_version', title: $filter('translate')('content.list.fields.APPVERSION'), sortable: 'pushDevice.appVersion', filter: { 'pushDevice.appVersion': 'text' }, show: $scope.getParamValue('app_version_show_filed', true), getValue: $scope.textValue },
            { field: 'device_uid', title: $filter('translate')('content.list.fields.DEVICEUID'), sortable: 'pushDevice.deviceUid', filter: { 'pushDevice.deviceUid': 'text' }, show: $scope.getParamValue('device_uid_show_filed', true), getValue: $scope.textValue },
            { field: 'device_reg', title: $filter('translate')('content.list.fields.DEVICEREG'), sortable: 'pushDevice.deviceReg', filter: { 'pushDevice.deviceReg': 'text' }, show: $scope.getParamValue('device_reg_show_filed', true), getValue: $scope.textValue },
            { field: 'device_token', title: $filter('translate')('content.list.fields.DEVICETOKEN'), sortable: 'pushDevice.deviceToken', filter: { 'pushDevice.deviceToken': 'text' }, show: $scope.getParamValue('device_token_show_filed', true), getValue: $scope.textValue },
            { field: 'device_name', title: $filter('translate')('content.list.fields.DEVICENAME'), sortable: 'pushDevice.deviceName', filter: { 'pushDevice.deviceName': 'text' }, show: $scope.getParamValue('device_name_show_filed', true), getValue: $scope.textValue },
            { field: 'device_email', title: $filter('translate')('content.list.fields.DEVICEEMAIL'), sortable: 'pushDevice.deviceEmail', filter: { 'pushDevice.deviceEmail': 'text' }, show: $scope.getParamValue('device_email_show_filed', false), getValue: $scope.textValue },
            { field: 'device_model', title: $filter('translate')('content.list.fields.DEVICEMODEL'), sortable: 'pushDevice.deviceModel', filter: { 'pushDevice.deviceModel': 'text' }, show: $scope.getParamValue('device_model_show_filed', false), getValue: $scope.textValue },
            { field: 'device_version', title: $filter('translate')('content.list.fields.DEVICEVERSION'), sortable: 'pushDevice.deviceVersion', filter: { 'pushDevice.deviceVersion': 'text' }, show: $scope.getParamValue('device_version_show_filed', false), getValue: $scope.textValue },
            { field: 'is_enabled_badge', title: $filter('translate')('content.list.fields.ISENABLEDBADGE'), sortable: 'pushDevice.isEnabledBadge', filter: { 'pushDevice.isEnabledBadge': 'select' }, show: $scope.getParamValue('is_enabled_badge_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_enabled_badge ]]"></span>') },
            { field: 'is_enabled_alert', title: $filter('translate')('content.list.fields.ISENABLEDALERT'), sortable: 'pushDevice.isEnabledAlert', filter: { 'pushDevice.isEnabledAlert': 'select' }, show: $scope.getParamValue('is_enabled_alert_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_enabled_alert ]]"></span>') },
            { field: 'is_enabled_sound', title: $filter('translate')('content.list.fields.ISENABLEDSOUND'), sortable: 'pushDevice.isEnabledSound', filter: { 'pushDevice.isEnabledSound': 'select' }, show: $scope.getParamValue('is_enabled_sound_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_enabled_sound ]]"></span>') },
            { field: 'development', title: $filter('translate')('content.list.fields.DEVELOPMENT'), sortable: 'pushDevice.development', filter: { 'pushDevice.development': 'select' }, show: $scope.getParamValue('development_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.developmentsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.development ]]" my-enum-list=\'[[ developments ]]\'></span>') },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'pushDevice.status', filter: { 'pushDevice.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'ip', title: $filter('translate')('content.list.fields.IP'), sortable: 'pushDevice.ip', filter: { 'pushDevice.ip': 'text' }, show: $scope.getParamValue('ip_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'pushDevice.createdAt', filter: { 'pushDevice.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'pushDevice.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'pushDevice.modifiedAt', filter: { 'pushDevice.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'pushDevice.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('pushDevicesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('pushDevicesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('pushDevicesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('pushDevicesCount', $scope.count);
    $scope.sorting = {'pushDevice.id': 'asc'};
    $scope.sorting = $scope.getParamValue('pushDevicesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('pushDevicesFilter', $scope.filter);
    $scope.setParamValue('pushDevicesPage', $scope.page);
    $scope.setParamValue('pushDevicesCount', $scope.count);
    $scope.setParamValue('pushDevicesSorting', $scope.sorting);
    $scope.setParamValue('pushDevicesFilter', $scope.filter);
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
            $scope.setParamValue('pushDevicesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('pushDevicesPage', current);
            $scope.setParamValue('pushDevicesCount', limit);
            $scope.setParamValue('pushDevicesSorting', order_by);
            $scope.setParamValue('pushDevicesFilter', filters);
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
            return $pushDevicesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPUSHDEVICE'),
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
                $pushDevicesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PUSHDEVICEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PUSHDEVICENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PUSHDEVICENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.mobile.pushdevicesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushdevicesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.mobile.pushdevicesdetails', {id: row.id});
    };
}]);

