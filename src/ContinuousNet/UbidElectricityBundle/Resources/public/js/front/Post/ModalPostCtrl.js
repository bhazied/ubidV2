'use strict';

/**
 * Controller for Post Details
 */

app.controller('ModalPostCtrl', ['slug', '$rootScope','$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postsDataFactory','$uibModalInstance',
    function(slug, $rootScope, $scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postsDataFactory, $uibModalInstance) {

      $scope.slug = slug;
            $postsDataFactory.getBySlug({slug: $scope.slug, locale: $localStorage.language}).$promise.then(function(data) {
                $scope.post = data;
                $rootScope.seo.meta_description = data.meta_description;
                $rootScope.seo.meta_keywords = data.meta_keywords;
                $rootScope.seo.meta_title = data.meta_title;
            });

        $scope.ok = function () {
            $uibModalInstance.close($scope.url);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

