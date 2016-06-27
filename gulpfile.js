var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');
var config = require('./gulp.config')();
var liveServer = require('live-server');

/* Start live server dev mode */
gulp.task('default', ['serve-dev'], function () {
    liveServer.start(config.liveServer.dev);
});

/* Start live server production mode */
gulp.task('build', ['build-serve'], function () {
    liveServer.start(config.liveServer.prod);
});