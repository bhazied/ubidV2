'use strict';

/**
 * Controller for Tenders List
 */

app.controller('MyTendersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyersDataFactory', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$biddingTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$tendersDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyersDataFactory, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $biddingTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('TendersCtrl', {$scope:$scope}));

    $scope.add = function() {
        $state.go('front.mytenders.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mytenders.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mytenders.details', {id: row.id});
    };

}]);

