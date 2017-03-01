app.controller('usersController', function ($rootScope, $scope, $http, $location, $timeout, userService) {

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
                // show success popup
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
            if (result.status == 200) {
                let user = {
                    username: result.data.username,
                    jwt: result.data.jwt
                }
                sessionStorage.setItem('user', JSON.stringify(user))
                userService.checkIfLoggedInAndAssignScopeVariable()

                $location.path('/')
                return
            }
            let obj = JSON.parse(result.data)
            console.log(obj.error)
        })
    }

    $scope.logout = function () {
        sessionStorage.clear()
        userService.checkIfLoggedInAndAssignScopeVariable()
        
        console.log('logged out ', this.user)
        $location.path('/')
    }
})