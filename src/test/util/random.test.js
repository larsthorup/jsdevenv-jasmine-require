/*global Math describe beforeEach spyOn it expect */
define(['util/random'], function () {
    'use strict';

    describe('util.random', function () {

        beforeEach(function () {
            spyOn(Math, 'random').andReturn(0.85);
        });

        describe('randomBelow', function () {

            it('should multiply correctly', function () {
                expect(Math.randomBelow(6)).toBe(5);
                expect(Math.randomBelow(1)).toBe(0);
            });
            it('should validate its arguments', function () {
                expect(function () { Math.randomBelow(0); }).toThrow('invalid argument: 0');
            });
        });
    });
});
