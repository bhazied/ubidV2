'use strict';

/**
 * Controller for Buyer Details
 */

app.controller('MyBuyerCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$buyersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $buyersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('BuyerCtrl', {$scope:$scope}));

    $scope.list = function() {
        $state.go('front.mybuyers.list');
    };

    $scope.add = function() {
        $state.go('front.mybuyers.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mybuyers.edit', {id: row.id});
    };

}]);

