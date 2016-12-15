app.controller('BuyerFrontFormCtrl', ['$scope', '$controller', '$state', 'SweetAlert','toaster', '$filter', function ($scope, $controller, $state, SweetAlert, toaster, $filter) {
    angular.extend(this, $controller('BuyerFormCtrl', {$scope:$scope}));

    $scope.submitForm = function(form) {
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
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
                $scope.disableSubmit = true;
                $buyersDataFactory.update($scope.buyer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BUYERUPDATED'));
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BUYERNOTUPDATED'));
                });
            return false;
        }
    };
    
    $scope.toProfile = function () {
        $state.go('front.profile');
    }
}]);