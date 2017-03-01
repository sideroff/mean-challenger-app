var app = angular.module('meanStoreManagementSystem', ['ngResource','ngRoute'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true)
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'homeController'
        })
        .when('/challenges/create', {
            templateUrl: 'views/challengeCreationForm.html',
            controller: 'challengesController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'usersController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',            
            controller: 'usersController'
        })
        .when('/not-found', {
            templateUrl: 'views/not-found.html'
        })
        .otherwise({
            redirectTo: '/not-found'
        })
}])