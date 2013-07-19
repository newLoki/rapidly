function ColleaguesController($scope) {
    $scope.colleagues = [
        {id: 1, name: "Michael"},
        {id: 2, name: "Norbert"},
        {id: 3, name: "Peter"}
    ];

    $scope.addColleague = function () {
        $scope.colleagues.push({name: $scope.colleagueName});
        $scope.colleagueName = '';
    };

    $scope.deleteColleague = function (colleagueToDelete) {
        var oldList = $scope.colleagues;
        $scope.colleagues = [];

        angular.forEach(oldList, function (colleague) {
            if (colleague.$$hashKey != colleagueToDelete.$$hashKey) {
                $scope.colleagues.push(colleague);
            }
        });
    }
}
