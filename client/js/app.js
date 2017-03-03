var app = angular.module('meanStoreManagementSystem', ['ngResource', 'ngRoute', 'ngAnimate'])

paths = {
    '/': {
        templateUrl: 'views/index.html',
        controller: 'homeController'
    },
    '/challenges': {

        templateUrl: 'views/challenges.html',
        controller: 'challengesController'
    },
    '/challenges/create': {
        templateUrl: 'views/challengeCreationForm.html',
        controller: 'challengesController',
        requiredLogin: true
    },
    '/register': {
        templateUrl: 'views/register.html',
        controller: 'usersController',
        requredLogout: true
    },
    '/login': {
        templateUrl: 'views/login.html',
        controller: 'usersController',
        requiredLogout: true
    },
    '/not-found': {
        templateUrl: 'views/not-found.html'
    }
}

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true)

    for (var path in paths) {
        $routeProvider.when(path, paths[path])
    }
    $routeProvider.otherwise({ redirectTo: '/not-found' })

}]).
    run(function ($rootScope, $location, userService, popupService) {
        $rootScope
            .$on('$routeChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                let desiredPath = paths[toState.$$route.originalPath]
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
            });
    })