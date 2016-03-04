myApp.factory('DataFactory', ['$http', function($http) {
    // private
    var taskData = undefined;

    // get from database
    var getTaskData = function() {
        console.log('getting data from server');
        var promise = $http.get('/task').then(function(response) {

            console.log(response);
            taskData = response.data;
            console.log('Async data response:', taskData);
        });
        return promise;
    };


    // add to database
    var saveTask = function(task) {
        console.log('saving new task');
        var promise = $http.post('/task', task).then(function(response){
            console.log('task saved');
            return getTaskData();
        });
        return promise;
    };

    // remove from database
    var removeTask = function(id){
        console.log('delete function factory id: ', id);
        var promise = $http.delete('/task/' + id).then(function(response) {
            getTaskData();
            console.log(response.data);
        });
        return promise;
    };


    // PUBLIC
    var publicTasks = {
        factoryTaskData: function() {
            return taskData;
        },
        factoryRetrieveData: function() {
            return getTaskData();
        },
        factorySaveTask: function(task) {
            return saveTask(task);
        },
        factoryDeleteTask: function(id) {
            return removeTask(id);
        }
    };

    return publicTasks;

}]);