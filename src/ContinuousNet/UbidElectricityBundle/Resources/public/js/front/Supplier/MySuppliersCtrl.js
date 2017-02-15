'use strict';

/**
 * Controller for Suppliers List
 */

app.controller('MySuppliersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$suppliersDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $suppliersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('SuppliersCtrl', {$scope:$scope}));


    $scope.setCols = function() {
        $scope.cols = [
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'supplier.picture', filter: { 'supplier.picture': 'text' }, show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'supplier.name', filter: { 'supplier.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'supplier_type', title: $filter('translate')('content.list.fields.SUPPLIERTYPE'), sortable: 'supplier_type.name', filter: { 'supplier.supplierType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSupplierTypes(), show: true, displayField: 'name', state: 'app.lists.suppliertypesdetails' },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'supplier.companyName', filter: { 'supplier.companyName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'supplier.firstName', filter: { 'supplier.firstName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'supplier.lastName', filter: { 'supplier.lastName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'supplier.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: $scope.getParamValue('categories_show_filed', false), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                +'<div class="btn-group pull-right">'
                +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
                +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                +'</div>') }
        ];
    };

    $scope.setCols();


    $scope.add = function() {
        $state.go('front.mysuppliers.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mysuppliers.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mysuppliers.details', {id: row.id});
    };
    
}]);

