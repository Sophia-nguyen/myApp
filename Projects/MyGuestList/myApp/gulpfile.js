var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');
var config = require('./gulp.config')();
var liveServer = require('live-server');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var s3 = require("gulp-s3");
var fs = require("fs");
var del = require('del');
var gulpif = require('gulp-if');

/* Start live server dev mode */
gulp.task('default', ['serve-dev'], function () {
    liveServer.start(config.liveServer.dev);
});

/* Start live server production mode */
gulp.task('build', ['build-serve'], function () {
    liveServer.start(config.liveServer.prod);
});

/* Upload file/folder after build to amazon-s3 */
gulp.task('upload', function () {
    runSequence('build-serve', 'clean-tmp', 'build-tmp', upload_s3);
    
    function  upload_s3() {
        var awsCredentials = {
        /*"key": "AKIAJUQKO2FVOUSOHSTQ",
        "secret": "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",
        "bucket": "mgls32",
        "region": "ap-southeast-1"*/   
        "key": "AKIAJNC2DPSTHX2MXK6Q",
            "secret": "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",
            "bucket": "mgls32",
            "region": "ap-southeast-1"
        };
        
        return gulp.src('.tmp/**')
        .pipe(s3(awsCredentials, {
            headers: {
                'uploadPath': '',
                'x-amz-acl': 'public-read'
            }
        }));
    }
});

gulp.task('clean-tmp', function () {
    return del(['.tmp']);
});

gulp.task('build-tmp', function () {
    var version = process.argv.pop(),
        tmpPath = '.tmp/' + version;
    
    return gulp.src(['build/**', '!build/index.html'])
        .pipe(gulp.dest(tmpPath));
});