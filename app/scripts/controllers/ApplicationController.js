define(['app', 'services/Session'], function(app){
    app.controller('ApplicationController', function($scope, $location, Session, $location){
        $scope.currentUser = null;
        
        $scope.$on('AUTH_STATE_CHANGED', function(event, args){
            $scope.currentUser = Session.user;
        });
        
        $scope.init = function(){
            if(!Session.checkStorage()) $location.path('/login');
            else Session.restoreSession();
        };
        
        $scope.logout = function(){
            Session.destroySession();
            $location.path('/home');
        };
    });
});