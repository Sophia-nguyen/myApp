var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../gulp.config')();
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var mainBowerFiles = require('main-bower-files');
var template = require('gulp-template');
var common = require('../tasks/common')();


/* Build env--dev */
gulp.task('serve-dev', function (done) {
    runSequence('clean-dev', ['compileTs-dev', 'index-dev', 'assets-dev', 'sass-dev', 'watch-ts', 'watch-sass'], done);
});

var dist = config.dist.path,
    baseUrl = 'src/';

gulp.task('clean-dev', function () {
    return common.delFolder(dist);
});

gulp.task('compileTs-dev', function () {
    return common.compileTs(config.tsFiles, baseUrl, dist);
});

gulp.task('index-dev', function () {
    return gulp.src(config.index)
    	.pipe(template(config.systemjs.dev))
        .pipe(gulp.dest(dist));
});

gulp.task('assets-dev', function () {
    return common.copyAssets(dist);
});

gulp.task('sass-dev', function () {
    return common.compileSass(dist);
});

gulp.task('watch-sass', function () {
    gulp.watch(config.assetsPath.styles + '**/*.scss', ['sass-dev']);
});

/* Watch changed typescripts file and compile it */
gulp.task('watch-ts', function () {
    return gulp.watch(config.tsFiles, function (file) {
        return common.compileTs(file.path, baseUrl, dist);
    });
});

/* Wiredep the bower main files to index file */
//- mainBowerFiles(): read dependencies bower.json file >> return an array paths of all files in bower-components.
//- inject: read index.html file >> find all comments (<!-- [name]:[file's type] -->    <!-- endinject -->) >>  insert <link> or <script> tag by [file's type] with path in array paths
gulp.task('wiredep', ['sass'], function () {
    return gulp.src(config.index)
        .pipe(inject(gulp.src(mainBowerFiles(), {
        read: false
    }), {
        name: 'bower'  //define for [name] in inject comment
    }))
        .pipe(inject(
        gulp.src(config.assetsPath.styles + 'main.css', {
            read: false
        })
        , {
            name: 'app'
        }))
        .pipe(gulp.dest(config.root));
});