app.controller('usersController', function ($scope, $http, $location) {
    $scope.createUser = function () {
        let newUserData = $scope.newUser
        $scope.newUser = {}
        console.log(newUserData)
        $http({
            method: 'POST',
            url: '/register',
            data: newUserData
        })
        .then(result => {            
            if (result.status == 200) {
                $location.path('/login')
                // show success popup
            }

        })
    }

    $scope.loginUser = function () {
        console.log('here')
        let userData = $scope.userWannaBe

        $http({
            method: 'POST',
            url: '/login',
            data: userData
        })
        .then(result => {
            if (result.status == 200){
                $location.path('/')
            }
        })
    }
})