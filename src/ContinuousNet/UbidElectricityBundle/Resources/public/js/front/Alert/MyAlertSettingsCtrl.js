'use strict';

/**
 * Controller for User Settings List
 */

app.controller('MyAlertSettingsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$usersDataFactory', '$userSettingsDataFactory','$controller',
    function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $usersDataFactory, $userSettingsDataFactory, $controller) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        angular.extend(this, $controller('UserSettingFormCtrl', {$scope:$scope}));

    }]);

