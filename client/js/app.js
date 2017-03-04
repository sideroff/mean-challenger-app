var app = angular.module('meanStoreManagementSystem', ['ngResource', 'ngRoute', 'ngAnimate'])

let routes = [
    {
        route: '/',
        href: '/',
        linkText: 'Home',
        templateUrl: 'views/index.html',
        controller: 'homeController'
    },
    {
        route: '/challenges',
        href: '/challenges',
        linkText: 'Challenges',
        templateUrl: 'views/challenges.html',
        controller: 'challengesController'
    },
    {
        route: '/challenges/create',
        href: '/challenges/create',
        linkText: 'Create challenge',
        templateUrl: 'views/challengeCreationForm.html',
        controller: 'challengesController',
        requiredLogin: true
    },
    {
        route: '/register',
        href: '/register',
        linkText: 'Register',
        templateUrl: 'views/register.html',
        controller: 'usersController',
        requredLogout: true
    },
    {
        route: '/login',
        href: '/login',
        linkText: 'Login',
        templateUrl: 'views/login.html',
        controller: 'usersController',
        requiredLogout: true
    },
    {
        route: '/users/username',
        href: '"/users/" + user.username',
        linkText: 'user.username',
        templateUrl: 'views/profile.html',
        controller: 'usersController',
        requiredLogout: true
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