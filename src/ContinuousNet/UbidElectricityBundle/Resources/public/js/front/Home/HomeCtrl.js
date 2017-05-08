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
        }, 1000);

        $scope.goPublication = function () {
            $state.go('front.mytenders.new', {locale: $rootScope.locale});
        };

        $scope.goTender = function () {
            $state.go('front.tenders', {section: 'Tender', locale: $rootScope.locale});
        };

        $scope.goProposal = function () {
            $state.go('front.tenders', {section: 'Consultation', locale: $rootScope.locale});
        };

        $scope.goSuppliers = function () {
            $state.go('front.suppliers', {locale: $rootScope.locale});
        };

        $scope.goBuyers = function () {
            $state.go('front.buyers', {locale: $rootScope.locale});
        };

        $postsDataFactory.getBySlug({slug: 'home', locale: $localStorage.language}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
        });

    }]);