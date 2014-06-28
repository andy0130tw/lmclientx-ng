module.exports = {
    build_dir: 'build',
    
    app_files: {
        js : [ 'app/scripts/**/*.js' ],
        css: [ 'app/styles/**/*.css' ],
        tpl: [ 'app/views/*.html' ]
    },
    
    vendor_files: {
        js : [
            'bower_components/moment/min/moment-with-langs.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-loading-bar/build/loading-bar.js',
            'bower_components/angular-moment/angular-moment.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css'
        ]
    }
};