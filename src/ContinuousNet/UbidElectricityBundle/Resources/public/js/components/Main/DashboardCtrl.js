'use strict';

/**
 * Controller for Dashboard
 */

app.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$dashboardDataFactory',
    function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $dashboardDataFactory) {

        $dashboardDataFactory.data().$promise.then(function(data) {
            $timeout(function(){
                $scope.data = data;
            });
        });

    }]);

