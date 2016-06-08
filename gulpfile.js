var gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    run_sequence = require('run-sequence');

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('usemin', ['jshint'], function () {
    return gulp.src('./app/menu.html')
        .pipe(usemin({
            css:[cleancss(), rev()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function () {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copyfonts', function () {
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    
    gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('browser-sync', function () {
    //Watch files to inject changes
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/images/**/*.png',
        'app/scripts/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./",
            index: "app/menu.html"
        }
    });
});

gulp.task('watch', ['browser-sync'], function() {
    //Do some watching tasks like compiling sass
    //gulp.watch('app/scss/**/*.scss', ['sass']); 
});

gulp.task('build', function (callback) {
    run_sequence('clean',
        ['usemin', 'imagemin', 'copyfonts'],
        callback
    );
});

gulp.task('default', function (callback) {
    run_sequence('watch', callback);
});