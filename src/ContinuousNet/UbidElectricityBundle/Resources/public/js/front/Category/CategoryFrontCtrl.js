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

        $scope.pageCounts = [5, 10, 20, 50, 100];

        $scope.total = 0;
        $scope.pages = [1];
        $scope.page = 1;
        $scope.maxPage = 1;
        $scope.showNextPage = false;
        $scope.showPrevPage = false;
        $scope.pageCount = 10;

        $scope.category = {};
        $scope.tenders = [];
        $scope.getCategory = function() {
            if (angular.isDefined($stateParams.slug)) {
                $tendersFrontDataFactory.category({
                    slug: $stateParams.slug,
                    locale: $localStorage.language
                }).$promise.then(function (data) {
                    $scope.category = data;

                    //paging

                    $scope.total = data.tenders.length;
                    $scope.maxPage = Math.ceil($scope.total / $scope.pageCount);
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

                    //end paging
                    var start = $scope.page;
                    var end = (start + 1) * $scope.pageCount;
                    $scope.tenders = data.tenders.slice(start, end);

                    $rootScope.seo.meta_description = data.meta_description;
                    $rootScope.seo.meta_keywords = data.meta_keywords;
                    $rootScope.seo.meta_title = data.meta_title;
                });
            }
        }

        $scope.getCategory();

        $scope.setPage = function() {
            $scope.page = page;
            $scope.getCategory();
        };

        $scope.nextPage = function() {
            $scope.page++;
            $scope.getCategory();
        };

        $scope.prevPage = function() {
            $scope.page--;
            $scope.getCategory();
        };

        $scope.setPageCount = function(pageCount) {
            $scope.pageCount = pageCount;
            $scope.getCategory();
        };

    }]);

