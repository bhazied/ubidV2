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

        $scope.getBuyer = function() {
            var $params = {
                locale: $localStorage.language,
                id: $stateParams.id
            };
            $timeout(function () {
                var def = $q.defer();
                $buyersFrontDataFactory.one($params).$promise.then(function(data){
                    $scope.buyer = data;
                });
                def.resolve($scope.buyer);
                return def;
            });

        }

        $scope.getBuyer();

    }]);