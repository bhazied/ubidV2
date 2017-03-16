'use strict';

/**
 * Controller for Alert Details
 */

app.controller('MyAlertsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$alertsDataFactory','$controller',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $alertsDataFactory, $controller) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        angular.extend(this, $controller('AlertsCtrl', {$scope:$scope}));

        $scope.setCols = function() {
            $scope.cols = [
                { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'alert.id', filter: { 'alert.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
                { field: 'types', title: $filter('translate')('content.list.fields.TYPES'), sortable: 'alert.types', filter: { 'alert.types': 'text' }, show: ($scope.getParamValue('types_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
                { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'alert.name', filter: { 'alert.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
                { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'alert.status', filter: { 'alert.status': 'select' }, show: ($scope.getParamValue('status_show_filed', true) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="alertStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
                { field: 'period', 'class': 'enum', title: $filter('translate')('content.list.fields.PERIOD'), sortable: 'alert.period', filter: { 'alert.period': 'select' }, show: ($scope.getParamValue('period_show_filed', true) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.periodsOptions, interpolateExpr: $interpolate('<span class="alertPeriod" my-enum="[[ row.period ]]" my-enum-list=\'[[ periods ]]\'></span>') },
                { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'alert.createdAt', filter: { 'alert.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', true) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'alert.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'alert.modifiedAt', filter: { 'alert.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'alert.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'alert.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('categories_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
                { field: 'countries', 'class': 'has_nany', title: $filter('translate')('content.list.fields.COUNTRIES'), filter: { 'alert.countries': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCountries(), show: ($scope.getParamValue('countries_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.settings.countriesdetails' },
                { title: $filter('translate')('content.common.ACTIONS'), show: true, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                    +'<div class="btn-group pull-right">'
                    +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
                    +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                    +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                    +'</div>') }
            ];
        };

        $scope.setCols();

        $scope.add = function() {
            $state.go('front.myAlerts.new');
        };

        $scope.edit = function(row) {
            $state.go('front.myAlerts.edit', {id: row.id});
        };

        $scope.details = function(row) {
            $state.go('front.myAlerts.details', {id: row.id});
        };

    }]);

