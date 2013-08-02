/**
 * @name clock
 * @description Custom directive that displays a clock.
 */

/*globals angular */

angular.module('ColleagueList').directive('itemCounter', function ($window) {
    "use strict";

    return {
        restrict: "E",
        template: '<p"></p>',
        link: function ($scope, iElement, iAttrs) {
            var notFoundMsg = "No colleagues found!";

            $scope.$watch("listLength", function (listLength) {
                iElement.text('Items: ' + listLength);

                if (listLength === 0) {
                    iElement.text(notFoundMsg);
                }
            });

            $scope.$watch("filteredLength", function (filteredLength) {
                iElement.text('Items: ' + filteredLength);

                if (filteredLength === 0) {
                    iElement.text(notFoundMsg);
                }
            });
        }
    };
});
