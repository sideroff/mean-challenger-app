app.controller('usersController', function ($rootScope, $scope, $http, $location, $timeout, userService, popupService) {

    this.user = $rootScope.user

    $scope.register = function () {
        let newUserData = $scope.newUser

        $http({
            method: 'POST',
            url: '/api/register',
            data: newUserData
        }).then(
            result => {
                if (result.status == 200) {
                    $location.path('/login')
                    popupService.addPopup(result.data)
                }
            },
            err => {
                console.log('err')
                popupService.addPopup({ type: 'error', text: 'Something went wrong while processing your request.' })
            })
    }

    $scope.login = function () {
        let userData = $scope.userWannaBe

        $http({
            method: 'POST',
            url: '/api/login',
            data: userData
        }).then(
            result => {
                popupService.addPopup(result.data)

                if (result.status == 200) {
                    let user = {
                        username: result.data.username,
                        jwt: result.data.jwt
                    }
                    sessionStorage.setItem('user', JSON.stringify(user))
                    userService.checkIfLoggedInAndAssignScopeVariable()

                    $location.path('/')
                }
            },
            err => {
                popupService.addPopup(err.data)
            })
    }

    $scope.logout = function () {
        sessionStorage.clear()
        userService.checkIfLoggedInAndAssignScopeVariable()

        popupService.addPopup({ type: 'info', text: 'You have logged out!' })

        $location.path('/')
    }

    $scope.checkUsername = function () {
        if (!$scope.newUser || !$scope.newUser.username || $scope.newUser.username.length == 0) {
            return
        }
        $http({
            method: 'GET',
            url: '/api/users/check/' + $scope.newUser.username,
        }).then(
            result => {
                popupService.addPopup(result.data)
            },
            err => {
                popupService.addPopup(err.data)
            }
            )
    }
})