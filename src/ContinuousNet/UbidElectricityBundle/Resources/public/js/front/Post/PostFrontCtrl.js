'use strict';

/**
 * Controller for Post Details
 */

app.controller('PostFrontCtrl', ['$rootScope','$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postsDataFactory',
function($rootScope, $scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language)) ? $localStorage.language : 'en';

    $scope.postLoaded = false;

    $timeout(function () {
        $rootScope.showSlogan = false;
        $rootScope.showUserMenu = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        console.log('set content size');
        $rootScope.contentSize = 12;
        $rootScope.contentOffset = 0;
    }, 2000);

    if (angular.isDefined($stateParams.slug)) {
        $postsDataFactory.getBySlug({slug: $stateParams.slug, locale: $scope.locale}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
            console.log(data.meta_title);
            console.log( $rootScope.seo);
        });
    }

}]);

