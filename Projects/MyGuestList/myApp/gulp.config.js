module.exports = function () {
    var root = '';
    var src = root + 'src/';
    var app = src + 'app/';
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
    var htmlFiles = [
        src + '**/*.html'
    ];
    var jsonFiles = [
        src + '**/*.json'
    ];
    var tsSpecFiles = [
        app + '**/*.spec.ts',
        testHelper + '**/*.ts'
    ];
    var dist = {
        path: 'dist/',
        app: 'dist/app/',
        assets: 'dist/assets/',
        images: 'dist/assets/images/',
        fonts: 'dist/assets/fonts/',
        themes: 'dist/assets/themes'
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
            host: "localhost",
            open: '/',
            root: '.',
            file: "dist/index.html",
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

    var systemjs = {
        dev: {
            ROOT: 'dist/',
            
            MAIN_FILE: 'app/bootstrap.js',

            SYSTEM_CONFIG: {
                baseURL: 'dist/',

                packages: {
                    'app': {
                        format: 'register',
                        defaultExtension: 'js'
                    },
                    'angular2': {
                        defaultExtension: 'js'
                    },
                    'rxjs': {
                        defaultExtension: 'js'
                    },
                    "ng2-translate": {
                        defaultExtension: "js"
                    }
                },
                paths: {
                    'angular2/*': '../node_modules/angular2/*',
                    'rxjs/*': '../node_modules/rxjs/*',
                    'ng2-translate/*': '../node_modules/ng2-translate/*',
                    immutable: '../node_modules/immutable/dist/immutable.js',
                    flux: '../node_modules/flux/dist/Flux.js',
                }
            }
        },

        build: {
            ROOT: '/',
            
            MAIN_FILE: 'app/application.js',

            SYSTEM_CONFIG: {
                packages: {
                    app: {
                        format: 'register',
                        defaultExtension: 'js'
                    }
                }
            }
        }
    };

    var systemjsBuild = {
        paths: {
            '*': 'prod/*',
            'ng2-translate/*': 'node_modules/ng2-translate/*',
            'angular2/*': 'node_modules/angular2/*',
            'rxjs/*': 'node_modules/rxjs/*',
            immutable: 'node_modules/immutable/dist/immutable.js',
            flux: 'node_modules/flux/dist/Flux.js',
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
        systemjsBuild: systemjsBuild,
        systemjs: systemjs,
        htmlFiles: htmlFiles,
        jsonFiles: jsonFiles
    };

    return config;
};