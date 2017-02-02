'use strict';

/**
 * Controller for Alert Details
 */

app.controller('MyAlertCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$alertsDataFactory',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $alertsDataFactory) {

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
            $state.go('app.access.alerts');
        };

        $scope.add = function() {
            $state.go('app.access.alertsnew');
        };

        $scope.edit = function(row) {
            $state.go('app.access.alertsedit', {id: row.id});
        };

        if (angular.isDefined($stateParams.id)) {
            $alertsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
                $scope.alert = data;
            });
        }

    }]);

