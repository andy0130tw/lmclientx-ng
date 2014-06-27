define([], function(){
    return {
        defaultRoutePath: 'home',
        routes: {
            'home': {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'HomeController'
            },
            'login': {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginController'
            },
            'post': {
                url: '/post/read/:postId',
                templateUrl: '/views/post.read.html',
                controller: 'PostReadController'
            }
        }
    };
});