'use strict';
/**
 * Controller bids by project
 */
app.controller('BidsByProjectCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$usersDataFactory','$bidsFrontDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $usersDataFactory, $bidsFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.sortingOptions = [{
            sortField: 'title',
            sortDirection: 'ASC',
            label: $filter('translate')('front.NAMEASC')
        }, {
            sortField: 'title',
            sortDirection: 'DESC',
            label: $filter('translate')('front.NAMEDESC')
        }, {
            sortField: 'title',
            sortDirection: 'DESC',
            label: $filter('translate')('front.VIEWSDESC')
        }, {
            sortField: 'title',
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

        $scope.bids = [];
        $scope.bidsLoaded = false;

        $scope.getBidsByProject = function () {
            var $params = {};
            $params.locale = $localStorage.language;
            $params.page = $scope.page;
            $params.pageCount = $scope.pageCount;
            $params.sortField = $scope.sortingOption.sortField;
            $params.sortDirection = $scope.sortingOption.sortDirection;
            if (angular.isDefined($stateParams.id)) {
                $params.id = $stateParams.id;
                $timeout(function () {
                    var def = $q.defer();
                    $scope.bidsLoaded = true;
                    if ($scope.bids.length == 0) {
                        console.log($params);
                        $bidsFrontDataFactory.bidsByProject($params).$promise.then(function (data) {
                            $scope.bids = data.results;
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
                        def.resolve($scope.bids);
                        return def;
                    }
                    else{
                        return $scope.bids;
                    }
                });
            }
        }
        $scope.getBidsByProject();

        $scope.setPage = function(page) {
            $scope.page = page;
            $scope.getBidsByProject();
        };

        $scope.nextPage = function() {
            $scope.page++;
            $scope.getBidsByProject();
        };

        $scope.prevPage = function() {
            $scope.page--;
            $scope.getBidsByProject();
        };

        $scope.setPageCount = function(pageCount) {
            $scope.pageCount = pageCount;
            $scope.getBidsByProject();
        };

        $scope.list = function(){
            $state.go('front.projectbids.list', {locale: $rootScope.locale});
        }
    }]);