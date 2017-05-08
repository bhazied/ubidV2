'use strict';

/**
 * Controller for Tender Details
 */

app.controller('MyTenderCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$tendersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $tendersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    },1000);

    angular.extend(this, $controller('TenderCtrl', {$scope:$scope}));

    $scope.list = function() {
        $state.go('front.mytenders.list', {locale: $rootScope.locale});
    };

    $scope.add = function() {
        $state.go('front.mytenders.new', {locale: $rootScope.locale});
    };

    $scope.edit = function(row) {
        $state.go('front.mytenders.edit', {id: row.id, locale: $rootScope.locale});
    };

}]);

