module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    "dist/animeapp.js": ['dist/animeapp.js']
                }
            }
        },
        watch: {
            angular: {
                files: ['src/frontend/**/*.js', 'src/frontend/**/*.html'],
                tasks: ['concat']
            },
            react: {
                files: [
                    'src/frontend/src/constants/*.js',
                    'src/frontend/src/dispatcher/*.js',
                    'src/frontend/src/actions/*.js',
                    'src/frontend/src/stores/*.js',
                    'src/frontend/src/routes.js',
                    'src/frontend/src/components/**/*.jsx'
                ],
                tasks: ['browserify']
            }
        },
        browserify: {
            options: {
                transform: [
                    require('grunt-react').browserify,
                    require('babelify')
                ]
            },
            client: {
                src: [
                    'src/frontend/src/constants/*.js',
                    'src/frontend/src/dispatcher/*.js',
                    'src/frontend/src/actions/*.js',
                    'src/frontend/src/stores/*.js',
                    'src/frontend/src/routes.js',
                    'src/frontend/src/components/**/*.jsx'
                ],
                dest: 'build/react_components.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat']);
    grunt.registerTask('react', ['browserify']);
};