module.exports = function () {
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
    
    var rename = require('gulp-rename');
    var fs = require('fs');
    var es = require('event-stream');
    
    
    var tsProject = ts.createProject(config.root + 'tsconfig.json');
    
    return {
        compileSass: function (dest) {
            var themePath = config.assetsPath.themes, 
                folders = getFolders(themePath);
            
            var tasks = folders.map(function (folder) {
                return gulp.src(path.join(themePath, folder, 'main.scss'))
                    .pipe(sass())
                    .pipe(cssnano())
                    .pipe(rename(folder + ".css"))
                    .pipe(gulp.dest(dest + "assets/themes"));
            });
            
            return es.concat.apply(null, tasks);
            
            function getFolders(dir) {
                return fs.readdirSync(dir)
                  .filter(function (file) {
                    return fs.statSync(path.join(dir, file)).isDirectory();
                });
            }
        },
        
        // Compile .ts file to .js file and .map (sourcemaps) file >> then insert into dest (with the same location of .ts file if base is '.');
        compileTs: function (files, baseUrl, dest) {
            var res = gulp.src(files, {
                base: baseUrl
            })
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(ts(tsProject));
            
            return res.js
                
                .pipe(gulp.dest(dest));
        },
        
        copyAssets: function (dest) {
            /* Copy all images file in app to dist */
            gulp.src(config.assetsPath.images + '**/*.*', {
                base: config.assetsPath.images
            })
            .pipe(gulp.dest(dest + "assets/images"));
            
            /* Copy all images file in app to dist */
            gulp.src(config.assetsPath.fonts + '**/*.*', {
                base: config.assetsPath.fonts
            })
            .pipe(gulp.dest(dest + "assets/fonts"));
        },
        
        delFolder: function (folder) {
            return del(folder);
        }
    }
}