'use strict';

/**
 * Controller for Push Messages List
 */

app.controller('PushMessagesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$pushDevicesDataFactory', '$pushNotificationsDataFactory', '$usersDataFactory', '$pushMessagesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $pushDevicesDataFactory, $pushNotificationsDataFactory, $usersDataFactory, $pushMessagesDataFactory) {

    $scope.sendingStatusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.sendingstatuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'Queued',
        title: $filter('translate')('content.list.fields.sendingstatuses.QUEUED'),
        css: 'success'
    }, {
        id: 'Delivered',
        title: $filter('translate')('content.list.fields.sendingstatuses.DELIVERED'),
        css: 'warning'
    }, {
        id: 'Failed',
        title: $filter('translate')('content.list.fields.sendingstatuses.FAILED'),
        css: 'danger'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.pushDevices = [];
    $scope.pushDevicesLoaded = false;

    $scope.getPushDevices = function() {
        $scope.pushDevicesLoaded = true;
        if ($scope.pushDevices.length == 0) {
            $scope.pushDevices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPUSHDEVICE')});
            var def = $q.defer();
            $pushDevicesDataFactory.query({offset: 0, limit: 10000, 'order_by[pushDevice.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.pushDevices.push({
                                id: data.results[i].id,
                                title: data.results[i].app_name
                            });
                        }
                        def.resolve($scope.pushDevices);
                    }
                });
            });
            return def;
        } else {
            return $scope.pushDevices;
        }
    };

    $scope.getPushDevices();

    $scope.pushNotifications = [];
    $scope.pushNotificationsLoaded = false;

    $scope.getPushNotifications = function() {
        $scope.pushNotificationsLoaded = true;
        if ($scope.pushNotifications.length == 0) {
            $scope.pushNotifications.push({id: '', title: $filter('translate')('content.form.messages.SELECTPUSHNOTIFICATION')});
            var def = $q.defer();
            $pushNotificationsDataFactory.query({offset: 0, limit: 10000, 'order_by[pushNotification.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.pushNotifications.push({
                                id: data.results[i].id,
                                title: data.results[i].title
                            });
                        }
                        def.resolve($scope.pushNotifications);
                    }
                });
            });
            return def;
        } else {
            return $scope.pushNotifications;
        }
    };

    $scope.getPushNotifications();

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
            sendingStatuses: $scope.sendingStatusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.pushMessagesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.pushMessagesParams)) {
           $localStorage.pushMessagesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.pushMessagesParams[param]) && $localStorage.pushMessagesParams[param] != null) {
            return $localStorage.pushMessagesParams[param];
        } else {
            $localStorage.pushMessagesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'pushMessage.id', filter: { 'pushMessage.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'push_device', title: $filter('translate')('content.list.fields.PUSHDEVICE'), sortable: 'push_device.app_name', filter: { 'pushMessage.pushDevice': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPushDevices(), show: $scope.getParamValue('push_device_id_show_filed', true), displayField: 'app_name', state: 'app.mobile.pushdevicesdetails' },
            { field: 'push_notification', title: $filter('translate')('content.list.fields.PUSHNOTIFICATION'), sortable: 'push_notification.title', filter: { 'pushMessage.pushNotification': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPushNotifications(), show: $scope.getParamValue('push_notification_id_show_filed', true), displayField: 'title', state: 'app.mobile.pushnotificationsdetails' },
            { field: 'delivery', title: $filter('translate')('content.list.fields.DELIVERY'), sortable: 'pushMessage.delivery', filter: { 'pushMessage.delivery': 'number' }, show: $scope.getParamValue('delivery_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'language_code', title: $filter('translate')('content.list.fields.LANGUAGECODE'), sortable: 'pushMessage.languageCode', filter: { 'pushMessage.languageCode': 'text' }, show: $scope.getParamValue('language_code_show_filed', true), getValue: $scope.textValue },
            { field: 'sending_status', title: $filter('translate')('content.list.fields.SENDINGSTATUS'), sortable: 'pushMessage.sendingStatus', filter: { 'pushMessage.sendingStatus': 'select' }, show: $scope.getParamValue('sending_status_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.sendingStatusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.sending_status ]]" my-enum-list=\'[[ sendingStatuses ]]\'></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'pushMessage.createdAt', filter: { 'pushMessage.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'pushMessage.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'pushMessage.modifiedAt', filter: { 'pushMessage.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'pushMessage.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'<button type="button" class="btn btn-info" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SEND')+'" ng-click="send(row)"><i class="ti-comment-alt"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('pushMessagesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('pushMessagesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('pushMessagesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('pushMessagesCount', $scope.count);
    $scope.sorting = {'pushMessage.id': 'asc'};
    $scope.sorting = $scope.getParamValue('pushMessagesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('pushMessagesFilter', $scope.filter);
    $scope.setParamValue('pushMessagesPage', $scope.page);
    $scope.setParamValue('pushMessagesCount', $scope.count);
    $scope.setParamValue('pushMessagesSorting', $scope.sorting);
    $scope.setParamValue('pushMessagesFilter', $scope.filter);
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
            $scope.setParamValue('pushMessagesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('pushMessagesPage', current);
            $scope.setParamValue('pushMessagesCount', limit);
            $scope.setParamValue('pushMessagesSorting', order_by);
            $scope.setParamValue('pushMessagesFilter', filters);
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
            return $pushMessagesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPUSHMESSAGE'),
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
                $pushMessagesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PUSHMESSAGEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PUSHMESSAGENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PUSHMESSAGENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.mobile.pushmessagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushmessagesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.mobile.pushmessagesdetails', {id: row.id});
    };

    $scope.send = function(row) {
        $state.go('app.mobile.pushmessagessend', {id: row.id});
    };
}]);

