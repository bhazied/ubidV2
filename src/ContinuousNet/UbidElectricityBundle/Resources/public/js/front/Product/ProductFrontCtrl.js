'use strict';

/**
 * Controller for Supplier Product Details
 */

app.controller('ProductFrontCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$supplierProductsDataFactory',
    function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $supplierProductsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        angular.extend(this, $controller('SupplierProductCtrl', {$scope:$scope}));

        $scope.supplierProduct = {};
        $scope.getSupplierProduct = function() {
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                $supplierProductsDataFactory.get($params).$promise.then(function(data){
                    $scope.supplierProduct = data;
                    $rootScope.seo.meta_description = data.description;
                    $rootScope.seo.meta_keywords = data.main_products_services;
                    $rootScope.seo.meta_title = data.name;
                });
                def.resolve($scope.supplierProduct);
                return def;
            });

        }

        $scope.getSupplierProduct();

    }]);

