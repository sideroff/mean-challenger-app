

app.controller('challengesController', function ($rootScope, $scope, $routeParams, $http, $location, userService, popupService) {

    $scope.currentUser = $rootScope.user

    $scope.challenges = []
    $scope.busy = false
    $scope.page = 1
    $scope.amount = 10


    if ($routeParams.urlName && !$scope.currentChallenge) {
        $http({
            method: 'GET',
            url: '/api/challenges/' + $routeParams.urlName
        }).then(
            result => {
                let challenge = result.data._id
                challenge.participations = result.data.participations
                challenge.completedBy = result.data.completedBy
                if ($rootScope.user) {
                    attachHasParticipated(challenge)
                    console.log(challenge)
                }
                $scope.currentChallenge = challenge
            },
            err => {
                $scope.err = err.data.text
            })
    }

    function attachHasParticipated(challenge) {
        let participation = challenge.participations.find(p => p.user == $rootScope.user.username)
        if (!participation) {
            challenge.hasParticipated = false
        }
        else {
            challenge.hasParticipated = participation.active
        }
    }

    $scope.mapToCorrectLength = function (string, margin = 300, limit = 700) {
        if (string.length < limit + margin) {
            return string
        }
        console.log('calling mapToCorrectLength')
        // number of chars depends on the length and is within the margin 
        return string.substring(0, limit + margin * (1 - margin / string.length))
    }

    $scope.nextPage = function () {
        console.log('calling nextPage')
        if ($scope.busy) return
        console.log('nextPage getting through')
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
            url: '/api/create',
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

    $scope.participate = function (challenge) {
        $http({
            method: 'POST',
            url: '/api/challenges/' + challenge.urlName + '/participate',
            headers: {
                'Authorization': 'Bearer ' + $rootScope.user.jwt
            },
        }).then(
            result => {
                challenge.hasParticipated = true
                let index
                for (let i in challenge.participations) {
                    if (challenge.participations[i].user == $rootScope.user.username) {
                        index = i
                        break
                    }
                }
                if (index) {
                    challenge.participations.splice(index, 1)
                }
                challenge.participations.push({ user: $rootScope.user.username, active: true })
                popupService.addPopup(result.data)
            },
            err => {
                popupService.addPopup(err)
            })
    }

    $scope.unParticipate = function (challenge) {
        $http({
            method: 'POST',
            url: '/api/challenges/' + challenge.urlName + '/un-participate',
            headers: {
                'Authorization': 'Bearer ' + $rootScope.user.jwt
            },
        }).then(
            result => {
                challenge.hasParticipated = false
                let p = challenge.participations.find(p => p.user == $rootScope.user.username)
                if (p) {
                    p.active = false
                }
                popupService.addPopup(result.data)
            },
            err => {
                popupService.addPopup(err)
            })
    }
})