module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({

        //
        // watch for changes
        //
        watch: {
            options: {
                atBegin: true
            },
            sass: {
                files: './source/scss/**/*.{scss,sass}',
                tasks: ['sass:dist']
            },
            js: {
                files: './source/**/*.js',
                tasks: ['uglify:watch']
            }
        },

        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed',
                includePaths: [
                    'node_modules/breakpoint-sass/stylesheets/',
                    'node_modules/breakpoint-slicer/stylesheets/'
                ]
            },
            dist: {
                files: {
                    'assets/css/mainstyle.css': 'source/scss/mainstyle.scss'
                }
            }
        },

        uglify: {
            watch: {
                files: {
                    'assets/js/custom.js': ['./source/js/custom/**/*.js'],
                },
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true
                }
            },
            build: {
                files: {
                    'assets/js/custom.js': ['./source/js/custom/**/*.js']
                },
                options: {
                    sourceMap: true,
                    preserveComments: false,
                    mangle: true,
                    compress: {
                        drop_console: false
                    }
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions', 'ie 8', 'ie 9']})
                ]
            },
            dist: {
                src: 'assets/css/*.css'
            }
        }
    });


    //
    // Use grunt-tasks to load modules instead of
    // grunt.loadNpmTasks('xxx');
    //
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});



    grunt.registerTask('default', ['watch']);
    grunt.registerTask('libs', ['uglify:build']);
    grunt.registerTask('build', ['sass:dist', 'libs','postcss']);
};