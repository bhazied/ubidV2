'use strict';

/**
 * Controller for Post Details
 */

app.controller('PostFrontCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postsDataFactory) {
console.warn($stateParams)
    if (angular.isDefined($stateParams.slug)) {
        $postsDataFactory.getBySlug({slug: $stateParams.slug}).$promise.then(function(data) {
            $scope.post = data;
        });
    }

}]);

