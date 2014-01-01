/*global define*/
define(['model'], function (Model) {
    'use strict';

    var Controller = function () {
        this.model = new Model();
    };
    return Controller;
});