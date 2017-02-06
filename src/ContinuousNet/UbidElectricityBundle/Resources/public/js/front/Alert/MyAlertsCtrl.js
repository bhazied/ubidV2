'use strict';

/**
 * Controller for Alert Details
 */

app.controller('MyAlertsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$alertsDataFactory','$controller',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $alertsDataFactory, $controller) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        angular.extend(this, $controller('AlertsCtrl', {$scope:$scope}));

        $scope.add = function() {
            $state.go('front.myAlerts.new');
        };

        $scope.edit = function(row) {
            $state.go('front.myAlerts.edit', {id: row.id});
        };

        $scope.details = function(row) {
            $state.go('front.myAlerts.details', {id: row.id});
        };

    }]);

