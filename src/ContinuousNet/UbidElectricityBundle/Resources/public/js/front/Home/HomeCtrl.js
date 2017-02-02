'use strict';
app.controller('HomeCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$q', '$HomeDataFactory','$filter',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $q, $HomeDataFactory, $filter) {

        /*$rootScope.showSlogan = false;
        $rootScope.showUserMenu = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
*/
        $timeout(function () {
            $rootScope.showSlogan = false;
            $rootScope.showUserMenu = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;

            console.log('set content size');
            $rootScope.contentSize = 12;
            $rootScope.contentOffset = 0;
            $rootScope.homeLoaded = true;
        }, 2000);

        $scope.goPublication = function () {
            $state.go('front.mytenders.new');
        }

        $scope.goTender = function () {
            $state.go('front.tenders.list', {section: 'Tender'});;
        }

        $scope.goProposal = function () {
            $state.go('front.tenders.list', {section: 'Consultation'});
        }

        $scope.goSuppliers = function () {
            $state.go('front.suppliers');
        }

        $scope.goBuyers = function () {
            $state.go('front.buyers');
        }

    }]);