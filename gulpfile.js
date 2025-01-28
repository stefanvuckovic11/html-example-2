'use strict';

var gulp = require('gulp');
var gulpSass = require('gulp-sass')(require('sass'));
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');
var cors = require('cors');

// package config
var config = JSON.parse(fs.readFileSync('./package.json'));

// Sass-related paths
var paths = {
    sass: [
        './src/sass/**/*.scss',
    ]
};

// This transform function is used by gulp-inject to append a cache-busting param
var transform = function (filepath) {
    var version = new Date().getTime().toString();
    if (filepath.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + filepath + '?v=' + version + '"/>';
    }
    return '<script type="text/javascript" src="' + filepath + '?v=' + version + '"></script>';
};

// Clean task
gulp.task('clean', function() {
    return gulp.src('./dist/*', { read: false })
        .pipe(clean());
});

/**
 * Inject SASS file references into main.scss
 */
gulp.task('inject-sass', function() {
    return gulp.src('./main.scss')
        .pipe(inject(gulp.src(['./src/sass/**/*.scss'], { read: false }), {
            addRootSlash: false,
            name: 'sass'
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Compile SASS -> CSS (using Dart Sass)
 */
gulp.task('sass', ['inject-sass'], function(done) {
    gulp.src('./main.scss')
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }).on('error', gulpSass.logError))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload())
        .on('end', done);
});

/**
 * Inject dev CSS/JS files (including Bower) into index.html
 */
gulp.task('inject-dev', function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(['./dist/**/*.css'], { read: false }), {
            relative: true,
            name: 'app',
            transform: transform
        }))
        .pipe(inject(gulp.src(mainBowerFiles()), {
            relative: true,
            name: 'vendor',
            transform: transform
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('./*.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

/**
 * Watch task
 */
gulp.task('watch', function() {
    // Re-run SASS and inject-dev whenever SCSS changes
    gulp.watch(paths.sass, ['sass', 'inject-dev']);
    // gulp.watch('./*.html', ['html']); // If you want to watch HTML changes
});

/**
 * Run local web server
 */
gulp.task('webserver', function() {
    connect.server({
        name: config.name,
        root: "." + config.webServer.path,
        port: config.webServer.port,
        livereload: true,
        middleware: function() {
            return [cors()];
        }
    });
});

/**
 * Build task
 */
gulp.task('build', function() {
    runSequence('clean', 'sass', 'inject-dev');
});

/**
 * Serve task (build + watch + local server)
 */
gulp.task('serve', function() {
    runSequence('build', 'webserver', 'watch');
});

// Default
gulp.task('default', ['build', 'webserver', 'watch']);
