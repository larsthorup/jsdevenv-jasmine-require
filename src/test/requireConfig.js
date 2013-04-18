/*global require*/
require.config({
    baseUrl: '../js',

    deps: ['../test/main'],

    paths: {
        jquery: '../lib/jquery',
        jasmine: '../test/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': '../test/lib/jasmine-1.3.1/jasmine-html'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': ['jasmine']
    }
});
