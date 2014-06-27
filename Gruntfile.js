module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-wiredep');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            target: {
                src: [
                    'app/index.html'
                ],
                cwd: './'
            }
        }
    });
}