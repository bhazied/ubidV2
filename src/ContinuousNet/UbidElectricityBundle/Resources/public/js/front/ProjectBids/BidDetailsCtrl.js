'use strict';

/**
 * Controller Front to show bid details
 */

app.controller('BidDetailsCtrl', ['$scope', '$rootScope','$controller', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bidsDataFactory','$bidsFrontDataFactory','toaster',
    function($scope, $rootScope, $controller, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bidsDataFactory, $bidsFrontDataFactory, toaster) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1500);

        angular.extend(this, $controller('BidCtrl', {$scope:$scope}));

        $scope.disableAdd = false;
        $scope.addToShortList = function () {
            $scope.disableAdd = true;
            var $params = {
                locale: $localStorage.language,
                id: $scope.bid.id
            };
            $bidsFrontDataFactory.bookmarkBid($params).$promise.then(function (data) {
                if (data.status == true) {
                    toaster.pop('success', $filter('translate')('content.common.SHORLISTBIDNOTIFICATION'), data.message);
                } else {
                    toaster.pop('error', $filter('translate')('content.common.SHORLISTBIDNOTIFICATION'), data.message);
                }
                $scope.disableAdd = false;
            });
        };
        
        $scope.list = function () {
            $state.go('front.projectbids.bids', {projectId: $scope.bid.tender.id, locale: $rootScope.locale});
        };

    }]);