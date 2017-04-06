'use strict';
/**
 * Check if field is unique or not
 */
app.directive('multipleCheck', ['$resource', '$rootScope', '$localStorage',
    function($resource, $rootScope, $localStorage) {
        var timeoutId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                //when the scope changes, check the email.
                scope.$watch(attrs.ngModel, function(value) {
                    ctrl.$setValidity('multipleCheck', (value.count == 0));
                });
            }
        }
    }]);
