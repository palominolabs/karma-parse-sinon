/**
Gruntfile to assis node development.
*/

module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		simplemocha: {
			options: {
				globals: ['should', 'sinon', 'Parse'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'dot'
			},

			all: { src: ['test/*.js'] }
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				force: true
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},

			// tests
			test: {
				src: ['test/**/*.js']
			},

			// src
			src: {
				src: ['index.js', 'lib/**/*.js']
			}
		}
	});

	/**
	 * Task loading
	 */
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	// mocha tests
	grunt.registerTask('mocha', 'simplemocha');

	grunt.registerTask('default', ['jshint:gruntfile', 'jshint:src', 'simplemocha']);
};
