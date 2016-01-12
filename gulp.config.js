module.exports = function () {
    var root = '';
    var src = root + 'src/';
    var app = src + 'app/';
    var js = src + 'js/';
    var testHelper = root + 'test-helpers/';
    var assets = src + 'assets/';
    var assetsPath = {
        styles: assets + 'css/',
        images: assets + 'images/',
        fonts: assets + 'fonts/',
        themes: assets + 'css/themes/',
        defaultTheme: assets + 'css/themes/default/' 
    };
    var index = src + 'index.html';
    var tsFiles = [
        src + '**/*.ts'
    ];
    var tsSpecFiles = [
        app + '**/*.spec.ts',
        testHelper + '**/*.ts'
    ];
    var dist = {
        path: 'dist/',
        assets: 'dist/assets/',
        images: 'dist/assets/images/',
        fonts: 'dist/assets/fonts/'
    };
    var build = {
        path: 'build/',
        app: 'build/app/',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var report = {
        path: 'report/'
    };
    var buildPath = {
        lib: {
            css: build.assetPath + build.assets.lib.css,
            js: build.assetPath + build.assets.lib.js
        },
        fonts: build.path + 'fonts'
    };
    var liveServer = {
        dev: {
            port: 8080,
            host: "127.0.0.1",
            open: '/',
            root: 'src/',
            file: "index.html",
            wait: 1000
        },
        prod: {
            port: 3000,
            host: "127.0.0.1",
            root: 'build/',
            file: "index.html",
            wait: 1000
        }
    };

    var systemjsBuild = {
        baseURL: 'dist',
        map: {
            'angular2': 'node_modules/angular2',
            'rxjs': 'node_modules/rxjs'
        },
        packages: {
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
    };

    var config = {
        root: root,
        app: app,
        src: src,
        js: js,
        testHelper: testHelper,
        assets: assets,
        index: index,
        build: build,
        dist: dist,
        report: report,
        assetsPath: assetsPath,
        buildPath: buildPath,
        tsFiles: tsFiles,
        tsSpecFiles: tsSpecFiles,
        liveServer: liveServer,
        systemjsBuild: systemjsBuild
    };

    return config;
};