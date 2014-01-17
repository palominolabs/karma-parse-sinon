'use strict';

var sinon = require('sinon');

var cloud = {
    Simulator: {

        _functions: {},

        runFunction: function (fnName, params, user) {
            var request = {
                    params: params,
                    user: user
                },
                response = {
                    success: sinon.spy(),
                    error: sinon.spy()
                };
            cloud.Simulator._functions[fnName](request, response);
            return response;
        },

        reset: function () {
            cloud.Simulator._functions = {};
        }
    }
};


cloud.define = function (fnName, fn) {
    cloud.Simulator._functions[fnName] = fn;
};

exports.Simulator = cloud.Simulator;
exports.define = cloud.define;