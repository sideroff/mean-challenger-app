

app.controller('challengesController', function ($rootScope, $scope, $http, $location, userService, popupService) {
    $scope.challenges = []
    $scope.busy = false
    $scope.page = 1
    $scope.amount = 10

    $scope.nextPage = function () {
        if ($scope.busy) return
        $scope.busy = true
        $http({
            method: 'GET',
            url: '/api/challenges?page=' + $scope.page++ + '&amount=' + $scope.amount
        }).then(result => {
            if (result.data.length == 0) {
                return
            }
            for (let c of result.data) {
                $scope.challenges.push(c)
            }
            $scope.busy = false
        },
            err => {
                console.log('err ', err)
            })
    }

    $scope.create = function () {
        if (!$scope.challengeWannaBe || !$scope.challengeWannaBe.name || !$scope.challengeWannaBe.urlName || !$scope.challengeWannaBe.description) {
            popupService.addPopup({ type: 'error', text: 'Name, urlName and description fields are required!' })
            return
        }

        let newChallenge = {
            name: $scope.challengeWannaBe.name,
            urlName: $scope.challengeWannaBe.urlName,
            description: $scope.challengeWannaBe.description
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
            err => {
                popupService.addPopup(err.data)
            })
    }

    $scope.participate = function () {

    }

    $scope.unParticipate = function () {

    }
})