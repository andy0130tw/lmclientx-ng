define(['app', 'services/UserService', 'services/Session'], function(app){
    app.controller('LoginController', function($scope, UserService, Session, $location){
        
        $scope.message = '';
        
        $scope.login = function(credentials){
            var mac = credentials.mac;
            UserService.tryLogin(mac).then(function(result){
                if(result === true){
                    Session.createSession(mac);
                    $location.path('/');
                }
                else $scope.message = '登入失敗，請檢查 MAC 是否正確！';
            });
        };
        
    });
});