'use strict';

/**
 * Controller for Messages List
 */

app.controller('MessageFrontCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$buyersDataFactory', '$suppliersDataFactory', '$messagesDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $buyersDataFactory, $suppliersDataFactory, $messagesDataFactory) {




        angular.extend(this, $controller('MessageCtrl', {$scope:$scope}));

        $scope.list = function() {
            $state.go('front.messages.list');
        };
        
    }]);

