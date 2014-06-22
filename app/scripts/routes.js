define([], function(){
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
                controller: 'HomeController'
            },
            '/login': {
                templateUrl: '/views/login.html',
                controller: 'LoginController'
            }
        }
    };
});