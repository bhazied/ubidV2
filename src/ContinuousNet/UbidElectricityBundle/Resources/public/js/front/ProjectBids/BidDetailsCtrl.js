'use strict';

/**
 * Controller Front to show bid details
 */

app.controller('BidDetailsCtrl', ['$scope', '$rootScope','$controller', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bidsDataFactory','$projectBidsFrontDataFactory',
    function($scope, $rootScope, $controller, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bidsDataFactory, $projectBidsFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1500);

        angular.extend(this, $controller('BidCtrl', {$scope:$scope}));


        $scope.addToShortList = function () {
            var $params = {
                locale: $localStorage.language,
                id: $scope.bid.id
            };
            $projectBidsFrontDataFactory.bookmarkBid($params).$promise.then(function (data) {
               console.log(data);
            });
        }
        
        $scope.list = function () {
            $state.go('front.projectbids.bids', {projectId: $scope.bid.tender.id});
        }

    }]);