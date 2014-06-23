require.config({
    baseUrl: '/scripts',
    paths: {
        'angular': '/bower_components/angular/angular',
        'angular-ui-router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'ngstorage': '/bower_components/ngstorage/ngStorage',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': '/bower_components/jquery/dist/jquery.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-ui-router', 'bootstrap']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'ngstorage': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['app', 'services/UserService', 'controllers/ApplicationController'], function(app){
    angular.bootstrap(document, ['app']);
});