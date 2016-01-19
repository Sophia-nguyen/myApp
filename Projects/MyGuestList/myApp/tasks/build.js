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
var template = require('gulp-template');
var inlineNg2Template = require('gulp-inline-ng2-template');
var common = require('../tasks/common')();
var replace = require('gulp-replace');

var build = config.build.path,
    prod = 'prod';

/* Prepare build using SystemJS Builder */
gulp.task('build-serve', function (done) {
    runSequence('clean-build', 'buildsJS', ['index-build', 'assets-build', 'sass-build', 'json-build'], 'clean-tmp', done);
});

gulp.task('buildsJS', ['compileTs-build'], function (done) { 
    // 'build-assets': minify and concat css/js for assets
    // 'tsc-app': compile all .ts file to .js file (in app)
    // 'systemjs-builder':
    var builder = new Builder('.');
    builder.config(config.systemjsBuild);
    builder.loader.defaultJSExtensions = true;
    builder
        .bundle('app/boot',
                config.build.path + 'app/boot.js', 
        {
            minify: false,
            globalDefs: { DEBUG: false }
        })
        .then(function () {
            console.log('Build complete');
            common.delFolder(prod);
            done();
        })
        .catch(function (ex) {
            console.log('error', ex);
            common.delFolder(prod);
            done('Build failed.');
        });
})

/* Clean build folder */
gulp.task('clean-build', function () {
    common.delFolder(prod);
    return common.delFolder(build);
});

gulp.task('compileTs-build', ['map:path'], function () {
	return common.compileTs('prod/**/*.ts', 'prod/', prod);
});

gulp.task('assets-build', function () {
    return common.copyAssets(build);
});

gulp.task('sass-build', function () {
    return common.compileSass(build);
});

gulp.task('json-build', function () {
    return gulp.src(config.jsonFiles, { base: 'src/' })
        .pipe(gulp.dest(config.build.path));
});

gulp.task('index-build', function () {
    // 'useref': find blocks <!-- build:[type (css/js)] [dest (bundle.css/bundle.js)] -->  [list of css or js files]  <!-- endbuild -->  in the HTML file
    // >> concat all files in block to dest file >> then use 'gulpif' check file's type and minify >> copy to build
    return gulp.src(config.index)
        .pipe(useref())
        //.pipe(gulpif('*.js', uglify()))
        .pipe(template(config.systemjs.build))
        .pipe(gulp.dest(config.build.path));
});

gulp.task('map:path', ['build:html'], function () {
    var file = prod + "/app/app.ts";

    return gulp.src(file)
        .pipe(replace('src/app/core/', 'app/core/'))
        .pipe(gulp.dest(prod + "/app"));
});

gulp.task('build:html',  function () {
    return gulp.src(config.tsFiles)
        .pipe(inlineNg2Template({ base: '.' }))
        .pipe(gulp.dest(prod));
});
