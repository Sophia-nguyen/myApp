var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../gulp.config')();
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var mainBowerFiles = require('main-bower-files');
var Builder = require('systemjs-builder');
var del = require('del');

/* Prepare build using SystemJS Builder */
gulp.task('build-serve', function (done) {
    runSequence('clean-build', 'build-sjs', done);
});

/* Clean build folder */
gulp.task('clean-build', function () {
    return del([config.build.path]);
});


// 'build-assets': minify and concat css/js for assets
// 'tsc-app': compile all .ts file to .js file (in app)
// 'systemjs-builder': 
gulp.task('build-sjs', function (done) {
    runSequence('serve-dev', /*['build:asset'],*/ buildSJS);
    function buildSJS () {
        var builder = new Builder('.');
        builder.config(config.systemjsBuild);
        builder.loader.defaultJSExtensions = true;
        builder
            .bundle('app/main',
                    config.build.path + 'app/main.js', 
            {
                minify: true,
                globalDefs: { DEBUG: false }
            })
            .then(function () {
                console.log('Build complete');
                done();
            })
            .catch(function (ex) {
                console.log('error', ex);
                done('Build failed.');
            });
    }
});

gulp.task('build:asset', function () {
    gulp.src(config.dist.assets)
            .pipe(gulp.dest(config.build.assets));

    gulp.src(config.dist.path + 'index.html')
            .pipe(gulp.dest(config.build.assetPath));
});