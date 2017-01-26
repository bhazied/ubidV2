'use strict';

/**
 * Controller for Supplier Products List
 */

app.controller('MyProductsCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$suppliersDataFactory', '$categoriesDataFactory', '$usersDataFactory', '$supplierProductsDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $suppliersDataFactory, $categoriesDataFactory, $usersDataFactory, $supplierProductsDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('SupplierProductsCtrl', {$scope:$scope}));

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'supplier', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'supplierProduct.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'supplierProduct.name', filter: { 'supplierProduct.name': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'supplierProduct.picture', filter: { 'supplierProduct.picture': 'text' }, show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'unit_cost', title: $filter('translate')('content.list.fields.UNITCOST'), sortable: 'supplierProduct.unitCost', filter: { 'supplierProduct.unitCost': 'number' }, show: true, getValue: $scope.textValue },
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
        $state.go('front.myproducts.new');
    };

    $scope.edit = function(row) {
        $state.go('front.myproducts.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.myproducts.details', {id: row.id});
    };

}]);

