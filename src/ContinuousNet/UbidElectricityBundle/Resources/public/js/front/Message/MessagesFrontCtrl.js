'use strict';

/**
 * Controller for Messages List
 */

app.controller('MessagesFrontCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$buyersDataFactory', '$suppliersDataFactory', '$messagesDataFactory',
    function($scope,$controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $buyersDataFactory, $suppliersDataFactory, $messagesDataFactory) {


        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 2000);

        angular.extend(this, $controller('MessagesCtrl', {$scope:$scope}));


        $scope.tableParams = new ngTableParams($scope.tableParams, {
            getData: function ($defer, params) {
                var current = params.page();
                var offset = (current - 1) * params.count();
                var limit = params.count();
                var order_by = params.sorting();
                var filters = params.filter();
                $scope.setParamValue('messagesIsFiltersVisible', $scope.isFiltersVisible);
                $scope.setParamValue('messagesPage', current);
                $scope.setParamValue('messagesCount', limit);
                $scope.setParamValue('messagesSorting', order_by);
                $scope.setParamValue('messagesFilter', filters);
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
                http_params.type = $stateParams.type;
                $scope.isLoading = true;
                return $messagesDataFactory.query(http_params).$promise.then(function(data) {
                    $scope.isLoading = false;
                    params.total(data.inlineCount);
                    return data.results;
                });
            }
        });

        $scope.setCols = function() {
            $scope.cols = [
                { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'message.id', filter: { 'message.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
                { field: 'body', title: $filter('translate')('content.list.fields.BODY'), sortable: 'message.body', filter: { 'message.body': 'text' }, show: $scope.getParamValue('body_show_filed', false), getValue: $scope.textValue },
                { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'message.createdAt', filter: { 'message.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'message.modifiedAt', filter: { 'message.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'reading_time', title: $filter('translate')('content.list.fields.READINGTIME'), sortable: 'message.readingTime', filter: { 'message.readingTime': 'text' }, show: $scope.getParamValue('reading_time_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'sending_time', title: $filter('translate')('content.list.fields.SENDINGTIME'), sortable: 'message.sendingTime', filter: { 'message.sendingTime': 'text' }, show: $scope.getParamValue('sending_time_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'is_read', title: $filter('translate')('content.list.fields.ISREAD'), sortable: 'message.isRead', filter: { 'message.isRead': 'select' }, show: $scope.getParamValue('is_read_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_read ]]"></span>') },
                { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'message.status', filter: { 'message.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="messageStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
                { field: 'subject', title: $filter('translate')('content.list.fields.SUBJECT'), sortable: 'message.subject', filter: { 'message.subject': 'text' }, show: $scope.getParamValue('subject_show_filed', false), getValue: $scope.textValue },
                { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'message.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'from_buyer', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMBUYER'), sortable: 'from_buyer.name', filter: { 'message.fromBuyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: $scope.getParamValue('from_buyer_id_show_filed', false), displayField: 'name', state: 'app.marketplace.buyersdetails' },
                { field: 'from_supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMSUPPLIER'), sortable: 'from_supplier.name', filter: { 'message.fromSupplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('from_supplier_id_show_filed', false), displayField: 'name', state: 'app.marketplace.suppliersdetails' },
                { field: 'from_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMUSER'), sortable: 'from_user.username', filter: { 'message.fromUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('from_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'message.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'to_buyer', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOBUYER'), sortable: 'to_buyer.name', filter: { 'message.toBuyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: $scope.getParamValue('to_buyer_id_show_filed', false), displayField: 'name', state: 'app.marketplace.buyersdetails' },
                { field: 'to_supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOSUPPLIER'), sortable: 'to_supplier.name', filter: { 'message.toSupplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('to_supplier_id_show_filed', false), displayField: 'name', state: 'app.marketplace.suppliersdetails' },
                { field: 'to_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOUSER'), sortable: 'to_user.username', filter: { 'message.toUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('to_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                    +'<div class="btn-group pull-right">'
                    +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                    +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                    +'</div>') }
            ];
        };

        $scope.setCols();

        $scope.details = function(row) {
            $state.go('front.messages.detail', {id: row.id, locale: $rootScope.locale});
        };
    }]);

