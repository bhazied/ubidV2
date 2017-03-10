'use strict';

/**
 * Controller for Category Details
 */

app.controller('CategoryFrontCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$categoriesFrontDataFactory',
    function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $categoriesFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
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
        $scope.suppliers = [];
        $scope.buyers = [];

        $scope.target = '';
        if (angular.isDefined($stateParams.target)) {
            $scope.target = $stateParams.target;
        }

        $scope.getCategory = function() {
            if (angular.isDefined($stateParams.slug)) {
                $categoriesFrontDataFactory.category({
                    slug: $stateParams.slug,
                    locale: $localStorage.language
                }).$promise.then(function (data) {
                    $scope.category = data.category;
                    //paging
                    var rows = [];
                    if ($scope.target == 'suppliers') {
                        rows = data.suppliers;
                    } else if ($scope.target == 'buyers') {
                        rows = data.buyers;
                    } else if ($scope.target == 'tenders') {
                        for (var i = 0 ; i < data.tenders.length ; i++ ) {
                            if (data.tenders[i].section == 'Tender') {
                                rows.push(data.tenders[i]);
                            }
                        }
                    } else if ($scope.target == 'consultations') {
                        for (var i = 0 ; i < data.tenders.length ; i++ ) {
                            if (data.tenders[i].section == 'Consultation') {
                                rows.push(data.tenders[i]);
                            }
                        }
                    }
                    $scope.total = rows.length;
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
                    if ($scope.target == 'suppliers') {
                        $scope.suppliers = rows.slice(start, end);
                        $rootScope.seo.meta_description = $scope.category.suppliers_meta_description;
                        $rootScope.seo.meta_keywords = $scope.category.suppliers_meta_keywords;
                        $rootScope.seo.meta_title = $scope.category.suppliers_meta_title;
                    } else if ($scope.target == 'buyers') {
                        $scope.buyers = rows.slice(start, end);
                        $rootScope.seo.meta_description = $scope.category.buyers_meta_description;
                        $rootScope.seo.meta_keywords = $scope.category.buyers_meta_keywords;
                        $rootScope.seo.meta_title = $scope.category.buyers_meta_title;
                    } else if ($scope.target == 'tenders') {
                        $scope.tenders = rows.slice(start, end);
                        $rootScope.seo.meta_description = $scope.category.tenders_meta_description;
                        $rootScope.seo.meta_keywords = $scope.category.tenders_meta_keywords;
                        $rootScope.seo.meta_title = $scope.category.tenders_meta_title;
                    } else if ($scope.target == 'consultations') {
                        $scope.tenders = rows.slice(start, end);
                        $rootScope.seo.meta_description = $scope.category.consultations_meta_description;
                        $rootScope.seo.meta_keywords = $scope.category.consultations_meta_keywords;
                        $rootScope.seo.meta_title = $scope.category.consultations_meta_title;
                    } else {
                        $rootScope.seo.meta_description = $scope.category.meta_description;
                        $rootScope.seo.meta_keywords = $scope.category.meta_keywords;
                        $rootScope.seo.meta_title = $scope.category.meta_title;
                    }
                });
            }
        }

        $scope.getCategory();

        $scope.setPage = function(page) {
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

