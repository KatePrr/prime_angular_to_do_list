myApp.controller('TaskController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    // send to datafactory
    $scope.dataFactory = DataFactory;
    //$scope.taskData = [];

    $scope.saveTask = function() {
        var task = {
            task: $scope.task,
            time: $scope.time,
            date: $scope.date
        };
        //console.log('taskController from saveTask: ', task);

        $scope.dataFactory.factorySaveTask(task);

    };
    //
    $scope.dataFactory.factoryRetrieveData().then(function(){
        $scope.taskData = $scope.dataFactory.factoryTaskData();
    //console.log($scope.taskData);
    });

    $scope.deleteChore = function(id) {
        console.log(id);
        $scope.dataFactory.factoryDeleteTask(id);


    };

    $scope.completeChore = function(id) {
        $scope.dataFactory.factoryDeleteTask(id);
    };

}]);