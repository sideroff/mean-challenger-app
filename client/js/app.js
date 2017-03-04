var app = angular.module('meanStoreManagementSystem', ['ngResource', 'ngRoute', 'ngAnimate','infinite-scroll'])

let routes = [
    {
        route: '/',
        templateUrl: 'views/index.html',
        controller: 'homeController'
    },
    {
        route: '/challenges',
        templateUrl: 'views/challenges.html',
        controller: 'challengesController'
    },
    {
        route: '/create',
        templateUrl: 'views/challengeCreationForm.html',
        controller: 'challengesController',
        requiredLogin: true
    },
    {
        route: '/register',
        templateUrl: 'views/register.html',
        controller: 'usersController',
        requredLogout: true
    },
    {
        route: '/login',
        templateUrl: 'views/login.html',
        controller: 'usersController',
        requiredLogout: true
    },
    {
        route: '/users/:username',
        templateUrl: 'views/profile.html',
        controller: 'usersController'
    },
    {
        route: '/challenges/:urlName',
        templateUrl: 'views/challenge.html',
        controller: 'challengesController',
    }]

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $locationProvider.html5Mode(true)

    for (let r of routes) {
        $routeProvider.when(r.route, r)
    }
    $routeProvider
        .when('/not-found', { templateUrl: 'views/not-found.html' })
        .otherwise({ redirectTo: '/not-found' })

}]).run(($rootScope, $location, userService, popupService) => {
    $rootScope.$on('$routeChangeStart', (event, toState, toParams, fromState, fromParams) => {
        let desiredPath = routes.find(r => r.route == toState.$$route.originalPath)
        if (desiredPath) {
            if (desiredPath.requiredLogin && !$rootScope.user) {
                popupService.addPopup({ type: 'error', text: 'You need to be logged in first!' })
                $location.path('/login')
                event.preventDefault()
            }
            else if (desiredPath.requiredLogout && $rootScope.user) {
                popupService.addPopup({ type: 'error', text: 'You need to be logged out first!' })
                $location.path('/')
                event.preventDefault()
            }
        }
    })
})