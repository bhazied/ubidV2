'use strict';
app.controller('SupplierFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$filter', '$suppliersFrontDataFactory','$suppliersDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $suppliersFrontDataFactory, $suppliersDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.loaded = false;
        $scope.supplier = {};
        $scope.supplierProducts = {count : 0, results:[]};

        $scope.getSupplierProducts = function () {
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                $suppliersFrontDataFactory.products($params).$promise.then(function (data) {
                    $scope.supplierProducts.count = data.inlineCount;
                    $scope.supplierProducts.results = data.results;
                });
                def.resolve($scope.supplierProducts);
                return def;
            });

        };

        $scope.getSupplier = function() {
            $(window).scrollTop(0);
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                if(angular.isDefined($localStorage.user)){
                    $suppliersDataFactory.get($params).$promise.then(function(data){
                        $scope.supplier = data;
                        $rootScope.seo.meta_description = data.description;
                        $rootScope.seo.meta_keywords = data.main_products_services;
                        $rootScope.seo.meta_title = data.name+ ' - '+ $filter('translate')('front.seo.SUPPLIERMETATITLE');
                        $scope.loaded = true;
                    });
                }
                else{
                    $suppliersFrontDataFactory.supplier($params).$promise.then(function(data){
                        $scope.supplier = data;
                        $rootScope.seo.meta_description = data.description;
                        $rootScope.seo.meta_keywords = data.main_products_services;
                        $rootScope.seo.meta_title = data.name+ ' - '+ $filter('translate')('front.seo.SUPPLIERMETATITLE');
                        $scope.loaded = true;
                    });
                }
                def.resolve($scope.supplier);
                return def;
            });

        }
        
        $scope.getSupplier();
        $scope.getSupplierProducts();

        $scope.list = function () {
            $state.go('front.suppliers', {locale: $rootScope.locale});
        }
        

    }]);