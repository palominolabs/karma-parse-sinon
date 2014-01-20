'use strict';

var should = require('should'),
    sinon = require('sinon'),
    Parse = require('../lib/cloud.js').Parse;

describe('Parse Cloud Code', function () {
    beforeEach(function (done) {
        Parse.Cloud.Simulator.reset();
        done();
    });

    describe('define', function () {

        it('stores functions', function () {
            var fn = function () {
                },
                fnName = 'myFn';
            Parse.Cloud.define(fnName, fn);
            Parse.Cloud.Simulator._functions[fnName].should.equal(fn);
        });

    });

    describe('Simulator', function () {

        describe('runFunction', function () {

            it('executes the cloud function', function () {
                var fn = sinon.spy(),
                    fnName = 'myFn';
                Parse.Cloud.define(fnName, fn);
                Parse.Cloud.Simulator.runFunction(fnName);
                fn.called.should.be.true;
            });

            it('supplies request params to the cloud function', function () {
                var fn = sinon.spy(),
                    fnName = 'myFn',
                    params = {foo: 'bar'};
                Parse.Cloud.define(fnName, fn);
                Parse.Cloud.Simulator.runFunction(fnName, params);
                fn.args[0][0].params.should.equal(params);
            });

            it('supplies request user to the cloud function', function () {
                var fn = sinon.spy(),
                    fnName = 'myFn',
                    params = {foo: 'bar'},
                    user = new Parse.User();
                Parse.Cloud.define(fnName, fn);
                Parse.Cloud.Simulator.runFunction(fnName, params, user);
                fn.args[0][0].user.should.equal(user);
            });

            it('returns response object with success and error spies', function () {
                var fn = function () {
                    },
                    fnName = 'myFn';
                Parse.Cloud.define(fnName, fn);
                var response = Parse.Cloud.Simulator.runFunction(fnName);

                (response.hasOwnProperty('success')).should.be.true;
                (typeof response.success.calledWith).should.equal('function');
                response.success.callCount.should.equal(0);
                response.success.toString().should.equal('spy');

                (response.hasOwnProperty('error')).should.be.true;
                (typeof response.error.calledWith).should.equal('function');
                response.error.callCount.should.equal(0);
                response.error.toString().should.equal('spy');
            });

            it('surfaces calls to success in the cloud function', function () {
                var returnValue = {success: true},
                    fn = function (request, response) {
                        response.success(returnValue)
                    },
                    fnName = 'myFn';

                Parse.Cloud.define(fnName, fn);
                var response = Parse.Cloud.Simulator.runFunction(fnName);

                response.success.calledOnce.should.be.true;
                response.success.args[0][0].should.equal(returnValue);

                response.error.called.should.not.be.true;
            });

            it('surfaces calls to error in the cloud function', function () {
                var returnValue = 'error message',
                    fn = function (request, response) {
                        response.error(returnValue)
                    },
                    fnName = 'myFn';

                Parse.Cloud.define(fnName, fn);
                var response = Parse.Cloud.Simulator.runFunction(fnName);

                response.success.called.should.not.be.true;

                response.error.calledOnce.should.be.true;
                response.error.args[0][0].should.equal(returnValue);
            });

        });

    });
});