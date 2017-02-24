'use strict';
app.controller('BuyerFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$filter', '$buyersFrontDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $buyersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 500);

        $scope.buyer = {};
        $scope.getBuyer = function() {
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                $buyersFrontDataFactory.buyer($params).$promise.then(function(data){
                    $scope.buyer = data;
                    $rootScope.seo.meta_description = data.description;
                    $rootScope.seo.meta_keywords = data.main_products_services;
                    $rootScope.seo.meta_title = data.name + ' - '+ $filter('translate')('front.seo.BUYERMETATITLE');
                });
                def.resolve($scope.buyer);
                return def;
            });

        }

        $scope.getBuyer();

    }]);