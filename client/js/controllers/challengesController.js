app.controller('challengesController', function ($rootScope, $scope, $http, userService) {
    $scope.create = function () {
        let newChallenge = {
            name: $scope.challengeWannaBe.name,
            urlName: $scope.challengeWannaBe.urlName,
            description: $scope.challengeWannaBe.description,
        }
        $http({
            method: 'POST',
            url: '/api/challenges',
            headers: {
                'Authorization' : 'Bearer ' + $rootScope.user.jwt
            },
            data: newChallenge
        }).then(result => {
            console.log(result)
        },
        error => {
            console.log(error)
        })
    }

    $scope.participate = function () {

    }

    $scope.unParticipate = function () {

    }
})