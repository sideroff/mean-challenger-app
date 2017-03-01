app.service('popupService', ['$rootScope', function ($rootScope) {
    $rootScope.popups = []

    this.addPopup = function (popupData) {
        if (popupData.type == 'error') {
            popupData.type = 'danger'
        }
        $rootScope.popups.push(popupData)
    }

    this.removePopup = function (index) {
        $rootScope.popups.splice(index, 1)
    }
}])