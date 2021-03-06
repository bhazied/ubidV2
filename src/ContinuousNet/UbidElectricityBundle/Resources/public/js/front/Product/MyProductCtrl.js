'use strict';

/**
 * Controller for Supplier Product Details
 */

app.controller('MyProductCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$supplierProductsDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $supplierProductsDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    }, 1500);

    angular.extend(this, $controller('SupplierProductCtrl', {$scope:$scope}));

    $scope.list = function() {
        $state.go('front.myproducts.list', {locale: $rootScope.locale});
    };

    $scope.add = function() {
        $state.go('front.myproducts.new', {locale: $rootScope.locale});
    };

    $scope.edit = function(row) {
        $state.go('front.myproducts.edit', {id: row.id, locale: $rootScope.locale});
    };

}]);

