app.service('userService', ['$rootScope', function ($rootScope) {
    
    this.checkIfLoggedInAndAssignScopeVariable  = function () {
        console.log('service')
        let user = sessionStorage.getItem('user')

        $rootScope.user = JSON.parse(user)
    }

    this.checkIfLoggedInAndAssignScopeVariable()
}])