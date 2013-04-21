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
                host: 'http://127.0.0.1:8009/',
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

    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        scripts: {
            files: ['src/**/*.*'],
            tasks: ['lint', 'test']
        }
    };


    // coverage
    gruntConfig.jasmine.istanbulHtml = {
        src: gruntConfig.jasmine.src.src,
        options: {
            specs: gruntConfig.jasmine.src.options.specs,
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: 'output/coverage/coverage.json',
                report: 'output/coverage'
            }
        }
    };
    grunt.registerTask('coverage:html', 'jasmine:istanbulHtml');
    gruntConfig.jasmine.istanbulCobertura = {
        src: gruntConfig.jasmine.istanbulHtml.src,
        options: {
            specs: gruntConfig.jasmine.istanbulHtml.options.specs,
            template: gruntConfig.jasmine.istanbulHtml.options.template,
            templateOptions: {
                coverage: gruntConfig.jasmine.istanbulHtml.options.template,
                report: {
                    type: 'cobertura',
                    options: {
                        dir: 'output/coverage/cobertura'
                    }
                }
            }
        }
    };
    grunt.registerTask('coverage:cobertura', 'jasmine:istanbulCobertura');
    grunt.registerTask('coverage', ['coverage:html', 'coverage:cobertura']);

    // grunt
    grunt.initConfig(gruntConfig);
};