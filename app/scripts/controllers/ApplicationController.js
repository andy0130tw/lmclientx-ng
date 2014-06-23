define(['app', 'services/Session'], function(app){
    app.controller('ApplicationController', function($scope, $location, Session, $state){
        $scope.currentUser = null;
        
        $scope.$on('AUTH_STATE_CHANGED', function(event, args){
            $scope.currentUser = Session.user;
        });
        
        $scope.init = function(){
            if(!Session.checkStorage()) $state.go('login');
            else Session.restoreSession();
        };
        
        $scope.logout = function(){
            Session.destroySession();
            $state.go('login', {reload: true});
        };
    });
});