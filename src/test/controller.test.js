/*global require define describe xit expect beforeEach */
require(['controller'], function (Controller) {
    'use strict';

    describe('controller', function () {

        beforeEach(function () {
            require.config({
                map: {
                    '*': {
                        'model': 'modelMock'
                    }
                }
            });
            define('modelMock', function () {
                return function () {
                    this.state = 'fake';
                };
            });
        });

        xit('should mock correctly', function () {
            var ModelMock = require('modelMock');
            var model = new ModelMock();
            expect(model.state).toBe('fake');
        });

        xit('should hold a new model', function () {
            var controller = new Controller();
            expect(controller.model.state).toBe('fake');
        });
    });

});

