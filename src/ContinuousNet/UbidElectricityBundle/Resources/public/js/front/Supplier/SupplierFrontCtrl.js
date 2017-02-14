'use strict';
app.controller('SupplierFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$filter', '$suppliersFrontDataFactory','$supplierProductsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $suppliersFrontDataFactory, $supplierProductsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 500);

        $scope.supplier = {};
        $scope.supplierProducts = {count : 0, results:[]};

        
        $scope.getSupplierProducts = function (supplierId) {
            var $params = {};
            var filters = {};
            $params['filters[supplierProduct.supplier]'] = supplierId;
            $timeout(function () {
                var def = $q.defer();
                $supplierProductsDataFactory.query($params).$promise.then(function (data) {
                    $scope.supplierProducts.count = data.inlineCount;
                    $scope.supplierProducts.results = data.results;
                });
                def.resolve($scope.supplierProducts);
                return def;
            });

        }
        $scope.getSupplier = function() {
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                $suppliersFrontDataFactory.supplier($params).$promise.then(function(data){
                    $scope.supplier = data;
                    $rootScope.seo.meta_description = data.description;
                    $rootScope.seo.meta_keywords = data.main_products_services;
                    $rootScope.seo.meta_title = data.name;
                });
                def.resolve($scope.supplier);
                return def;
            });

        }
        
        $scope.getSupplier();
        $scope.getSupplierProducts($stateParams.id);
        

    }]);