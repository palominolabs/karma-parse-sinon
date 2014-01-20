'use strict';

var Parse = require('parse').Parse,
    sinon = require('sinon');

var augmentParse = function (Parse, sinon) {
    Parse.Cloud = Parse.Cloud || {};
    Parse.Cloud.Simulator = {
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
            Parse.Cloud.Simulator._functions[fnName](request, response);
            return response;
        },

        reset: function () {
            Parse.Cloud.Simulator._functions = {};
        }
    };
    Parse.Cloud.define = function (fnName, fn) {
        Parse.Cloud.Simulator._functions[fnName] = fn;
    };
    return Parse;
};

exports.Parse = augmentParse(Parse, sinon);