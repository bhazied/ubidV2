'use strict';
/**
 * Set label & css for color fileds
 */
app.directive('myColor', [
function ($rootScope, ToggleHelper) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            attrs.$observe('myColor', function(value) {
                if (value != '') {
                    angular.element(elem).text(value.replace('#', ''));
                    angular.element(elem).attr('style', 'background-color:'+value+';color:#fff');
                }
            });
        }
    };
}]);