/*global require*/
require([
// ToDo: 'domReady!',
    'jasmine',
    'jasmine-html',
    '../test/util/random.test.js',
    '../test/util/passwordEvaluator.test.js',
    '../test/controller.test.js'
], function (jasmine) {
    'use strict';
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.addReporter(new jasmine.HtmlReporter());
    jasmineEnv.execute();
});
