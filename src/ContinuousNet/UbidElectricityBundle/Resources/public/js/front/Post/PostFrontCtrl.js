'use strict';

/**
 * Controller for Post Details
 */

app.controller('PostFrontCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language)) ? $localStorage.language : 'en';

    if (angular.isDefined($stateParams.slug)) {
        $postsDataFactory.getBySlug({slug: $stateParams.slug, locale: $scope.locale}).$promise.then(function(data) {
            console.warn(data)
            $scope.post = data;
        });
    }

}]);

