angular.module('app.LoginController', ['app.UserService', 'app.Session', 'ui.router'])

.config(function($stateProvider){
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/views/login.html'
    });
})
.controller('LoginController', function($scope, UserService, Session, $state){

    $scope.message = '';

    $scope.login = function(credentials){
        var mac = credentials.mac;
        UserService.tryLogin(mac).then(function(result){
            if(result === true){
                Session.createSession(mac);
                $state.go('home');
            }
            else $scope.message = '登入失敗，請檢查 MAC 是否正確！';
        });
    };

});