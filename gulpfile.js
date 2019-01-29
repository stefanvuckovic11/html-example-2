/**
 * Created by Lindon Camaj on 1/29/19.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');
var cors = require('cors');

// package config
var config = JSON.parse(fs.readFileSync('./package.json'));
var paths = {
    sass:[
        './src/sass/**/*.scss',
    ]
};

// transform used by gulp inject
var transform = function(path) {
    var version = new Date().getTime().toString();
    if (path.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + path + '?v=' + version + '"/>';
    }
    path += '?v=' + version;
    // return inject.transform.apply(inject.transform, arguments);
    return '<script type="text/javascript" src="' + path + '"></script>';
};

// clean task
gulp.task('clean', function() {
    return gulp.src('./dist/*', { read: false })
        .pipe(clean());
});

/**
 * Inject sass files to main sass file
 */
gulp.task('inject-sass', function() {
    return gulp.src('./main.scss')
        .pipe(inject(gulp.src(['./src/sass/**/*.scss'], { read: false }), {
            addRootSlash: false,
            name: 'sass'
        }))
        //.pipe(rename('main.scss'))
        .pipe(gulp.dest('./'));
});

/**
 * Sass task
 */
gulp.task('sass', ['inject-sass'], function(done) {
    gulp.src('./main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload())
        .on('end', done);
});

// inject dev files to json
gulp.task('inject-dev', function() {

    gulp.src('./index.html')
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

// watch task
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass', 'inject-dev']);
    //gulp.watch('./*.html', ['html']);
});

// run local web server, that will be used to serve angular files
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

// build dev
gulp.task('build', function() {
    runSequence('clean', 'sass', 'inject-dev');
});

// build dev and start local server
gulp.task('serve', function() {
    runSequence('build', 'webserver', 'watch');
});

gulp.task('default', ['build', 'webserver', 'watch']);