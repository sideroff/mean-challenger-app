app.service('userService', ['$rootScope', function ($rootScope) {
    
    
    this.checkIfLoggedInAndAssignScopeVariable  = function () {
        let user = sessionStorage.getItem('user')

        $rootScope.user = JSON.parse(user)
    }

    this.checkIfLoggedInAndAssignScopeVariable()
}])