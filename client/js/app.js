var app = angular.module('meanStoreManagementSystem', ['ngResource','ngRoute'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true)
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'homeController'
        })
        .when('/hello', {
            templateUrl: 'views/someOther.html'
        })
        .when('/not-found', {
            templateUrl: 'views/not-found.html'
        })
        .otherwise({
            redirectTo: '/not-found'
        })
}])