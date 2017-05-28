module.exports = function(grunt) {
    
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    
    var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                options: {
                    compress: false
                },
                files: {
                    'dist/css/style.css': 'src/less/style.less'
                }
            },
            release: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/style.css': 'src/less/style.less'
                }
            },
             development: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/style.css': 'src/less/style.less'
                }
            }
        },
        watch: {
            development: {
                files: ['src/less/**/*.less', 'src/js/**/*.js', 'src/**/index.php'],
                tasks: [ "webpack", "copy:development"]
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                // configuration for this build
            }
        },
        clean: {
            build: ["dist/*"],
            release: ["dist/*"],
            development: ["dist/*"],
            tmp: ["tmp/*"]
        },
        uglify: {
            release: {
                options: {
                    mangle: true
                },
                files: {
                    'dist/js/bundle1.js': ['tmp/bundle1.js']
                }
            },
            build: {
                files: {
                    'dist/js/bundle1.js': ['tmp/bundle1.js']
                }
            },
            development: {
                files: {
                    'dist/js/bundle1.js': ['tmp/bundle1.js']
                }
            }
        },
        copy: {
            build: {
                files: [
                  {src: ['src/index.php'], dest: 'dist/index.php'}
                ]
            },
            development: {
               files: [
                  {src: ['tmp/bundle1.js'], dest: 'dist/js/bundle1.js'},
                  {src: ['src/index.php'], dest: 'dist/index.php'}
                ]
            }
        }
    });

    // Load the plugin that compiles our less into css
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('build', ['clean:build', "webpack", "copy:build", 'clean:tmp']);

    grunt.registerTask('development', ['clean:development', 'watch:development']);
    grunt.registerTask('default', ['less:dev', "webpack"]);
    grunt.registerTask('release', ['clean:release', "webpack", "uglify:release", 'clean:tmp']);
};