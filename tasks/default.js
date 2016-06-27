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
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var sass = require('gulp-sass');
var del = require('del');

var cssnano = require('gulp-cssnano');;
var rename = require('gulp-rename');
var fs = require('fs');
var es = require('event-stream');


/* Prepare build using SystemJS Builder */
gulp.task('serve-dev', function (done) {
    runSequence('clean-dev', ['tsc-app', 'sass', 'copy:html', 'copy:assets', 'watch-ts', 'watch-sass'], done);
});

/* Initialize TS Project */
var tsProject = ts.createProject(config.root + 'tsconfig.json');
var tsFiles = config.tsFiles;


/* Clean dist folder */
gulp.task('clean-dev', function () {
    return del([config.dist.path]);
});

gulp.task('tsc-app', function () {
    return compileTs(config.tsFiles);
});

gulp.task('sass', function () {
    var themePath = config.assetsPath.themes, 
        folders = getFolders(themePath);
    
    var tasks = folders.map(function (folder) {
        return gulp.src(path.join(themePath, folder, 'main.scss'))
            .pipe(sass())
            .pipe(cssnano())
            .pipe(rename(folder + ".css"))
            .pipe(gulp.dest(config.dist.assets));
    });
    
    return es.concat.apply(null, tasks);

    function getFolders(dir) {
        return fs.readdirSync(dir)
          .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    }
});

gulp.task('copy:assets', function () {
    /* Copy all images file in app to dist */
    gulp.src(config.assetsPath.images + '**/*.*', {
            base: config.assetsPath.images
        })
        .pipe(gulp.dest(config.dist.images));

    /* Copy all images file in app to dist */
    gulp.src(config.assetsPath.fonts + '**/*.*', {
            base: config.assetsPath.fonts
        })
        .pipe(gulp.dest(config.dist.fonts));

    // 'useref': find blocks <!-- build:[type (css/js)] [dest (bundle.css/bundle.js)] -->  [list of css or js files]  <!-- endbuild -->  in the HTML file
    // >> concat all files in block to dest file >> then use 'gulpif' check file's type and minify >> copy to build
    return gulp.src(config.index)
            .pipe(useref())
            //.pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', cssnano()))
            .pipe(gulp.dest(config.dist.path));
});

gulp.task('copy:html', function () {
    /* Copy all html file in app to dist */
    gulp.src(config.app + '**/*.html', {
            base: config.src
        })
        .pipe(gulp.dest(config.dist.path));
});

gulp.task('watch-sass', function () {
    gulp.watch(config.assetsPath.styles + '**/*.scss', ['sass']);
});

/* Watch changed typescripts file and compile it */
gulp.task('watch-ts', function () {
    return gulp.watch(tsFiles, function (file) {
        console.log('Compiling ' + file.path + '...');
        return compileTs(file.path);
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

// Compile .ts file to .js file and .map (sourcemaps) file >> then insert into dest (with the same location of .ts file if base is '.');
function compileTs(files) {
    var res = gulp.src(files, {
        base: 'src/'
    })
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return res.js
        .pipe(sourcemaps.write('.', {
        // Return relative source map root directories per file.
        includeContent: false,
        sourceRoot: function (file) {
            var sourceFile = path.join(file.cwd, file.sourceMap.file);
            return path.relative(path.dirname(sourceFile), file.cwd);
        }
    }))
        .pipe(gulp.dest(config.dist.path));
}