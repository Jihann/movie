/**
 * Created by Jihann on 2015/9/12.
 */
module.exports = function(grunt) {

    grunt.initConfig({
       watch: {
           jade: {
               files: ['views/**'],
               options: {
                   livereload: true
               }
           },
           js: {
               files: ['public/javascripts/**', 'models/**/*.js', 'schemas/**/*.js'],
               //tasks: ['jshint'],
               options: {
                   livereload: true
               }
           }
       },
        nodemon: {
           dev: {
               options: {
                   script:'app.js',
                   args: [],
                   ignore: ['README.md', 'node_modules/**', 'DS_Store'],
                   ext: 'js',
                   watch: ['./'],
                   nodeArgs: ['--debug'],
                   delay: 1000,
                   env:{
                       PORT: 3000
                   },
                   cwd: __dirname
               }
           }
       },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },
       concurrent: {
           tasks: ['nodemon', 'watch'],
           options: {
               logConcurrentOutput: true
           }
       }
    });

    //监视文件变化
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('test', ['mochaTest'])
};