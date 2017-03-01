app.controller('popupsController', function($rootScope, $scope, $resource, popupService) {
    this.popups = $rootScope.popups

    this.removePopup = function (index) {
        console.log(index)
        popupService.removePopup(index)
        console.log(this.popups)
    }
})