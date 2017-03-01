app.controller('usersController', function ($rootScope, $scope, $http, $location, $timeout, userService, popupService) {

    this.user = $rootScope.user

    $scope.register = function () {
        let newUserData = $scope.newUser

        $http({
            method: 'POST',
            url: '/register',
            data: newUserData
        }).then(result => {
            if (result.status == 200) {
                $location.path('/login')
                popupService.addPopup(result.data)
            }
        })
    }

    $scope.login = function () {
        let userData = $scope.userWannaBe

        $http({
            method: 'POST',
            url: '/login',
            data: userData
        }).then(result => {

            let popup = {
                type: result.data.type,
                text: result.data.text
            }
            popupService.addPopup(popup)
            console.log('here, ', popup)

            if (result.status == 200) {
                let user = {
                    username: result.data.username,
                    jwt: result.data.jwt
                }
                sessionStorage.setItem('user', JSON.stringify(user))
                userService.checkIfLoggedInAndAssignScopeVariable()

                $location.path('/')
            }
        })
    }

    $scope.logout = function () {
        sessionStorage.clear()
        userService.checkIfLoggedInAndAssignScopeVariable()

        popupService.addPopup({ type: 'info', text: 'You have logged out!' })

        $location.path('/')
    }
})