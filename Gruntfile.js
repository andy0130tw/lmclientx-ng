module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    
    var config = require('./config.js');
    
    var init = {
        pkg: grunt.file.readJSON('package.json'),
        
        clean: [
            '<%= build_dir %>'
        ],
        
        copy: {
            build_app_js: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_app_tpl: {
                files: [
                    {
                        src: [ '<%= app_files.tpl %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_js: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendor_img: {
                files: [
                    {
                        src: ['<%= vendor_files.img %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },
        
        concat: {
            build_css: {
                src: [ '<%= vendor_files.css %>', '<%= app_files.css %>' ],
                dest: '<%= build_dir %>/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        },
        
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/**/*.js',
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            }
        },
        
        delta: {
            files: [ 'app/**/*' ],
            tasks: [ 'build' ]
        }
    };
    
    grunt.initConfig(grunt.util._.extend(init, config));
    
    grunt.registerTask('build', ['clean', 'copy:build_app_js', 'copy:build_vendor_js', 'copy:build_vendor_img', 'copy:build_app_tpl', 'concat:build_css', 'index:build']);
    
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);
    
    function filterCss(files){
        return files.filter(function(file){
            return file.match(/\.css$/) && (file.substring(0, 6) === 'build/');
        });
    }
    
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var jsFiles = grunt.config('vendor_files.js');
        jsFiles = jsFiles.concat(grunt.file.expand(grunt.config('app_files.js')));
        var cssFiles = filterCss(this.filesSrc).map(function(file){
            return file.replace('build/', '');
        });
        grunt.file.copy('app/index.html', this.data.dir + '/index.html', {
            process: function(contents, path){
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
    
};