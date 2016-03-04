var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'TaskController'
        })
        .when('/taskForm', {
            templateUrl: '/views/templates/taskForm.html',
            controller: 'TaskController'
        })
        .when('/lists', {
            templateUrl: 'views/templates/lists.html',
            controller: 'TaskController'
        })
        .otherwise({
            redirectTo: 'home'
        })


}]);