app.controller('popupsController', function($rootScope, $scope, $resource, popupService) {
    this.popups = $rootScope.popups

    this.removePopup = function (index) {
        popupService.removePopup(index)
    }
})