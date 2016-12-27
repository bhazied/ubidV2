'use strict';
/**
 * Make icon for boolena values
 */
app.directive('myTooltip', [
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $(elem).hover(function () {
                    $(elem).tooltip('show');
                }, function () {
                    $(elem).tooltip('hide');
                });
            }
        };
    }]);