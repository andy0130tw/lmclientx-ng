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
            build_vendor_js: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },
        
        concat: {
            build_css: {
                src: [ '<%= vendor_files.css %>' ],
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
        }
    };
    
    grunt.initConfig(grunt.util._.extend(init, config));
    
    grunt.registerTask('build', ['clean', 'copy:build_app_js', 'copy:build_vendor_js', 'concat:build_css', 'index:build']);
    
      /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    grunt.file.copy('app/index.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' )
          }
        });
      }
    });
  });
    
};