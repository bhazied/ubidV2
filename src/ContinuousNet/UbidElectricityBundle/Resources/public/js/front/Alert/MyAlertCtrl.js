'use strict';

/**
 * Controller for Alert Details
 */

app.controller('MyAlertCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$alertsDataFactory','$controller',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $alertsDataFactory, $controller) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        angular.extend(this, $controller('AlertCtrl', {$scope:$scope}));

        $scope.list = function() {
            $state.go('front.myAlerts.list');
        };

        $scope.add = function() {
            $state.go('front.myAlerts.new');
        };

        $scope.edit = function(row) {
            $state.go('front.myAlerts.edit', {id: row.id});
        };
        

    }]);

