'use strict';

var path = require('path');

var pattern = function (file) {
    return {pattern: file, included: true, served: true, watched: false};
};

var framework = function (files) {
    files.unshift(pattern(path.resolve(require.resolve('sinon'), '../../pkg/sinon.js')));
    files.unshift(pattern(__dirname + '/lib/cloud.js'));
};

framework.$inject = ['config.files'];
module.exports = {'framework:parse-sinon': ['factory', framework]};