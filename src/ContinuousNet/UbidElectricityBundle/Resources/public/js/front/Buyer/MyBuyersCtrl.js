'use strict';

/**
 * Controller for Buyers List
 */

app.controller('MyBuyersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$buyersDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $buyersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('BuyersCtrl', {$scope:$scope}));
    
    $scope.add = function() {
        $state.go('front.mybuyers.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mybuyers.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mybuyers.details', {id: row.id});
    };

}]);

