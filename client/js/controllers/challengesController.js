app.controller('challengesController', function ($rootScope, $scope, $http, $location, userService, popupService) {
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
                'Authorization': 'Bearer ' + $rootScope.user.jwt
            },
            data: newChallenge
        }).then(
            result => {
                popupService.addPopup({ type: result.data.type, text: result.data.text })

                if (result.status == 200) {
                    $location.path('/challenges/' + result.data.urlName)
                }
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