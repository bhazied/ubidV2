'use strict';

/**
 * Controller for Categories List
 */

app.controller('CategoriesFrontCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$productTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory','$tendersFrontDataFactory', '$postsDataFactory',
    function($scope, $controller,$rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $productTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersFrontDataFactory, $postsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        },2000);

        $postsDataFactory.getBySlug({slug: 'categories', locale: $localStorage.language}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
        });

        $scope.tree_data =[];

        $scope.categoriesLoaded = false;
        $scope.categories = [];
        $scope.expandFirst = 0;
        $scope.selectedFirst = '';
        $scope.getCategories = function () {
            $timeout(function () {
                $scope.categoriesLoaded = true;
                if($scope.categories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesList({locale: $localStorage.language}).$promise.then(function (data) {
                        $scope.categories = data.results;
                        angular.forEach(data.results, function(value, key){
                            if (key == 0) {
                                $scope.selectedFirst = value.node.name;
                            }
                            var item = {label: value.node.name, id: value.node.id , slug: value.node.slug, children: []}
                            if (angular.isDefined(value.children)){
                                if ($scope.expandFirst == 0) {
                                    $scope.expandFirst = key;
                                }
                                angular.forEach(value.children, function (child) {
                                    var childItem = {label: child.name, id: child.id, slug: child.slug};
                                    item.children.push(childItem);
                                });
                            }
                            $scope.tree_data.push(item);
                        });
                        def.resolve($scope.categories);
                    });
                    return def;
                }
                else {
                    return $scope.categories;
                }
            });
        }

        $scope.getCategories();

        $scope.selectedYet = false;
        $scope.selectedCategory = {};
        $scope.category_selected = function (branch) {
            $scope.selectedYet = true;
            $scope.selectedCategory = {
                id: branch.id,
                slug: branch.slug,
                name: branch.label,
                tenderCount: branch.tenderCount
            };

        }

    }]);

