'use strict';

/**
 * Controller for Categories List
 */

app.controller('CategoriesFrontCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$productTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory','$tendersFrontDataFactory',
    function($scope, $controller,$rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $productTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 0;
        },1500);
        

        $scope.tree_data =[];

        $scope.tenderCategoriesLoaded = false;
        $scope.tenderCategories = [];
        $scope.expandFirst = 0;
        $scope.selectedFirst = '';
        $scope.getTenderCategories = function () {
            $timeout(function () {
                $scope.tenderCategoriesLoaded = true;
                if($scope.tenderCategories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesTenders({locale: $localStorage.language}).$promise.then(function (data) {
                        $scope.tenderCategories = data.results;
                        angular.forEach(data.results, function(value, key){
                            if(key == 0){ $scope.selectedFirst = value.node.name; }
                            var item = {label: value.node.name, id: value.node.id , slug: value.node.slug, tenderCount: value.node.tenders.length, children: []}
                            if(angular.isDefined(value.children)){
                                if($scope.expandFirst == 0){ $scope.expandFirst = key; }
                                angular.forEach(value.children, function (child) {
                                    var childItem = {label: child.name, id: child.id, slug: child.slug, tenderCount: child.tenders.length};
                                    item.children.push(childItem);
                                });
                            }
                            $scope.tree_data.push(item);
                        });
                        def.resolve($scope.tenderCategories);
                    });
                    return def;
                }
                else {
                    return $scope.tenderCategories;
                }
            });
        }

        $scope.getTenderCategories();

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

