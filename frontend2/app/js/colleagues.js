function ColleaguesController($scope, $resource) {

    $scope.colleagues = {};

    $scope.addColleague = function () {

        var colleague = new $scope.colleague();
        colleague.name = $scope.colleagueName;
        colleague.$save();

        $scope.load();

        $scope.colleagueName = '';
    };

    $scope.colleague = $resource('http://localhost\\:8888/server.php/?id=:id');

    $scope.load = function () {
        $scope.colleagues = $scope.colleague.query();
    };

    $scope.deleteColleague = function (colleagueToDelete) {
        $scope.colleague.delete({id: colleagueToDelete.id});

        $scope.load();
    };

    $scope.load();
}
