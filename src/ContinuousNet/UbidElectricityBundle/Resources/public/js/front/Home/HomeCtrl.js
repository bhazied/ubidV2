'use strict';
app.controller('HomeCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$q', '$filter', '$HomeDataFactory', '$postsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $q, $filter, $HomeDataFactory, $postsDataFactory) {

        $scope.homeLoaded = false;

        $timeout(function () {
            $rootScope.showSlogan = false;
            $rootScope.showUserMenu = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.contentSize = 12;
            $rootScope.contentOffset = 0;
            $scope.homeLoaded = true;
        }, 2000);

        $scope.goPublication = function () {
            $state.go('front.mytenders.new');
        };

        $scope.goTender = function () {
            $state.go('front.tenders.list', {section: 'Tender'});;
        };

        $scope.goProposal = function () {
            $state.go('front.tenders.list', {section: 'Consultation'});
        };

        $scope.goSuppliers = function () {
            $state.go('front.suppliers');
        };

        $scope.goBuyers = function () {
            $state.go('front.buyers');
        };

        $postsDataFactory.getBySlug({slug: 'home', locale: $scope.locale}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
        });

    }]);