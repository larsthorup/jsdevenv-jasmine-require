/*global require*/
require([
// ToDo: 'domReady!',
    'jasmine',
    'jasmine-html',
    '../test/util/random.test.js',
    '../test/util/passwordEvaluator.test.js'
], function (jasmine) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.addReporter(new jasmine.HtmlReporter());
    jasmineEnv.execute();
});
