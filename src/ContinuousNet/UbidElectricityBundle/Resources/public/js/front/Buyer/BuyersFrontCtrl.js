'use strict';
app.controller('BuyersFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$filter', '$buyersFrontDataFactory', '$postsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $buyersFrontDataFactory, $postsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 1500);

        $postsDataFactory.getBySlug({slug: 'buyers', locale: $localStorage.language}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
        });

        $scope.sortingOptions = [{
            sortField: 'name',
            sortDirection: 'ASC',
            label: $filter('translate')('front.NAMEASC')
        }, {
            sortField: 'name',
            sortDirection: 'DESC',
            label: $filter('translate')('front.NAMEDESC')
        }, {
            sortField: 'views',
            sortDirection: 'DESC',
            label: $filter('translate')('front.VIEWSDESC')
        }, {
            sortField: 'name',
            sortDirection: 'ASC',
            label: $filter('translate')('front.VIEWSASC')
        }];
        $scope.pageCounts = [5, 10, 20, 50, 100];

        $scope.sortingOption = $scope.sortingOptions[0];
        $scope.total = 0;
        $scope.pages = [1];
        $scope.page = 1;
        $scope.maxPage = 1;
        $scope.showNextPage = false;
        $scope.showPrevPage = false;
        $scope.pageCount = 10;
        $scope.buyersLoaded = false;
        $scope.buyers = [];

        $scope.getBuyers = function() {
            $(window).scrollTop(0);
            var $params = {};
            $params.locale = $localStorage.language;
            $params.page = $scope.page;
            $params.pageCount = $scope.pageCount;
            $params.sortField = $scope.sortingOption.sortField;
            $params.sortDirection = $scope.sortingOption.sortDirection;
            $timeout(function () {
                var def = $q.defer();
                $buyersFrontDataFactory.list($params).$promise.then(function(data){
                    $scope.buyersLoaded = true;
                    $scope.buyers = data.results;
                    $scope.total = data.inlineCount;
                    $scope.maxPage = Math.ceil($scope.total/$scope.pageCount);
                    if ($scope.page > $scope.maxPage) {
                        $scope.page = $scope.maxPage;
                    }
                    $scope.pages = [];
                    for (var i = 1; i <= $scope.maxPage; i += 1) {
                        $scope.pages.push(i);
                    }
                    if ($scope.maxPage > 1) {
                        if ($scope.page < $scope.maxPage) {
                            $scope.showNextPage = true;
                        } else {
                            $scope.showNextPage = false;
                        }
                        if ($scope.page > 1) {
                            $scope.showPrevPage = true;
                        } else {
                            $scope.showPrevPage = false;
                        }
                    } else {
                        $scope.showNextPage = false;
                        $scope.showPrevPage = false;
                    }
                });
                def.resolve($scope.buyers);
                return def;
            });

        }

        $scope.getBuyers();

        $scope.setPage = function(page) {
            $scope.page = page;
            $scope.getBuyers();
        };

        $scope.nextPage = function() {
            $scope.page++;
            $scope.getBuyers();
        };

        $scope.prevPage = function() {
            $scope.page--;
            $scope.getBuyers();
        };

        $scope.setPageCount = function(pageCount) {
            $scope.pageCount = pageCount;
            $scope.getBuyers();
        };

    }]);