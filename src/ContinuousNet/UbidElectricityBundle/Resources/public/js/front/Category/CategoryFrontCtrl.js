'use strict';

/**
 * Controller for Category Details
 */

app.controller('CategoryFrontCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$tendersFrontDataFactory',
    function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $tendersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 0;
        },1500);

        $scope.category = {};
        if (angular.isDefined($stateParams.id)) {
            $tendersFrontDataFactory.category({id: $stateParams.id, locale: $localStorage.language}).$promise.then(function(data) {
                $scope.category = data;
            });
        }

    }]);

