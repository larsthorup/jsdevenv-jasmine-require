/*global module, require*/
module.exports = function (grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['lint', 'test']);
    grunt.registerTask('all', ['clean', 'lint', 'test', 'coverage']);

    // continuous integration
    grunt.registerTask('ci', ['lint', 'test']);


    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {
        output: ['output']
    };


    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true,
            indent: 4, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true,
            quotmark: true, regexp: true, undef: true, unused: true, strict: true, trailing: true,
            maxparams: 3, maxdepth: 2, maxstatements: 50},
        all: [
            'Gruntfile.js',
            'src/**/*.js',
            '!src/lib/**/*.js',
            '!src/test/lib/**/*.js'
        ]
    };
    grunt.registerTask('lint', 'jshint');

    // serve
    grunt.registerTask('wait', 'keep running until terminated', function () {
        /* var done =*/
        this.async();
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    gruntConfig.connect = {};
    gruntConfig.connect.all = {
        options: {
            port: 8009
        }
    };

    // test
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    gruntConfig.jasmine = {
        src: {
            src: [
                'src/js/**/*.js',
                '!src/js/main.js',
                '!src/js/requireConfig.js'
            ],
            options: {
                specs: 'src/test/**/*.test.js',
                // host: 'http://127.0.0.1:8009/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: './src/js/',
                        mainConfigFile: 'src/test/requireConfig.js'
                    }
                },
                junit: {
                    path: 'output/testresults'
                }
            }
        }
    };
    grunt.registerTask('test', ['connect:all', 'jasmine:src']);

    // coverage
    gruntConfig.jasmine.istanbul = {
        src: gruntConfig.jasmine.src.src,
        options: {
            specs: gruntConfig.jasmine.src.options.specs,
            host: gruntConfig.jasmine.src.options.host,
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: 'output/coverage/coverage.json',
                report: [
                    {type: 'html', options: {dir: 'output/coverage'}},
                    {type: 'cobertura', options: {dir: 'output/coverage/cobertura'}},
                    {type: 'text-summary'}
                ],
                template: gruntConfig.jasmine.src.options.template,
                templateOptions: {
                    requireConfig: {
                        baseUrl: './src/js/',
                        mainConfigFile: 'src/test/requireConfig.js'
                    }
                }
            }
        }
    };
    grunt.registerTask('coverage', 'jasmine:istanbul');

    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        scripts: {
            files: ['src/**/*.*'],
            tasks: ['lint', 'test']
        }
    };


    // grunt
    grunt.initConfig(gruntConfig);
};