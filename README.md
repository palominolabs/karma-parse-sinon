# karma-parse-sinon[![Build Status](https://secure.travis-ci.org/palominolabs/karma-parse-sinon.png?branch=master)](http://travis-ci.org/palominolabs/karma-parse-sinon)

A [Karma](http://karma-runner.github.io) plugin for unit testing [Parse Cloud Code](https://www.parse.com/docs/cloud_code_guide).

## Installation

TODO

## Usage

The main functionality that this package provides is the `Parse.Cloud.Simulator.runFunction` method:

```js
/**
 * Simulates the execution of a Cloud Code function.
 *
 * @method runFunction
 * @param {String} functionName The name of the Cloud Code function to execute.
 * @param {Object} [params] The parameters object sent to the function by the client.
 * @param {Parse.User} [user] The Parse.User that is making the request.
 * @return {Object} The response object.
 *   @param {Function} success A sinon spy for the response success method.
 *   @param {Function} error A sinon spy for the response error method.
 */
function runFunction(functionName, params, user)
```

Given a Parse Cloud Code function:

```js
Parse.Cloud.define('hello', function(request, response) {
    if (request.params.helpful == false || request.user.get('disposition') == 'rude') {
        response.error('Go away.');
    } else {
        response.success('Hello world!');
    }
});
```

You can use the `Parse.Cloud.Simulator` to test the function:

```js
describe('hello', function () {

    it('says hi', function () {
        var response = Parse.Cloud.Simulator.runFunction('hello');

        response.success.called.should.be.true;
        response.success.args[0][0].should.equal('Hello world!');
    });

    it('errors when feeling unhelpful', function () {
        var response = Parse.Cloud.Simulator.runFunction('hello', {
            helpful: false
        });

        response.error.called.should.be.true;
        response.error.args[0][0].should.equal('Go away.');
    });

    it('errors when feeling unhelpful', function () {
        var user = new Parse.User();
        user.set('disposition', 'rude');

        var response = Parse.Cloud.Simulator.runFunction('hello', {}, user);

        response.error.called.should.be.true;
        response.error.args[0][0].should.equal('Go away.');
    });

});
```