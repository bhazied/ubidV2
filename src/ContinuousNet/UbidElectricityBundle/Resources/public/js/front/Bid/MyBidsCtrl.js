'use strict';

/**
 * Controller for Bids List
 */

app.controller('MyBidsCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {


    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('BidsCtrl', {$scope:$scope}));


    $scope.add = function() {
        $state.go('front.mybids.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mybids.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mybids.sdetails', {id: row.id});
    };
}]);

