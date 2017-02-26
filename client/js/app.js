var app = angular.module('meanStoreManagementSystem', ['ngResource','ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
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