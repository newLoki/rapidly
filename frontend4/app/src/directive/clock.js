/**
 * @name clock
 * @description Custom directive that displays a clock.
 */

/*globals angular */

angular.module('ColleagueList').directive('clock', function ($window) {
    "use strict";

    return {
        restrict: "E",
        link: function (scope, iElement, iAttrs) {
            $window.setInterval(function () {
                iElement.text((new Date()).toLocaleTimeString());
            }, 1000);
        }
    };
});
