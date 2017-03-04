'use strict';
app.controller('contactFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$filter', 'SweetAlert', 'toaster', '$contactDataFactory', '$postsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, SweetAlert, toaster, $contactDataFactory, $postsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 2;
        }, 1500);

        $postsDataFactory.getBySlug({slug: 'contact', locale: $localStorage.language}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
        });

        $scope.disableSubmit = false;
        $scope.submitForm = function (form) {
            var firstError = null;
            if (form.$invalid) {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                return false;
            } else {
                $scope.disableSubmit = true;
                $scope.contact.locale = $localStorage.language;
                $contactDataFactory.contact($scope.contact).$promise.then(function (data) {
                    var type = ''
                    if(data.status == 0){
                        toaster.pop('success', $filter('translate')('infos.titles.CONTACT'), data.message);
                    }
                    if(data.status == 1){
                        toaster.pop('error', $filter('translate')('errors.titles.CONTACT'), data.message);
                    }
                    $scope.disableSubmit = false;
                });
            }
        }

    }]);