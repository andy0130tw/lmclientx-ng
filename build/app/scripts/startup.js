require.config({
    baseUrl: '/scripts',
    paths: {
        'moment': '/bower_components/moment/min/moment-with-langs.min',
        'angular': '/bower_components/angular/angular.min',
        'angular-moment': '/bower_components/angular-moment/angular-moment.min',
        'angular-animate': '/bower_components/angular-animate/angular-animate.min',
        'angular-sanitize': '/bower_components/angular-sanitize/angular-sanitize.min',
        'angular-ui-router': '/bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-loading-bar': '/bower_components/angular-loading-bar/build/loading-bar.min',
        'ngstorage': '/bower_components/ngstorage/ngStorage.min',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': '/bower_components/jquery/dist/jquery.min'
    },
    shim: {
        'moment': {
            deps: ['jquery']
        },
        'app': {
            deps: ['angular', 'angular-ui-router', 'bootstrap']
        },
        'angular': {
            exports: 'angular'
        },
        'angular-moment': {
            deps: ['angular', 'moment']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-linkify': {
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