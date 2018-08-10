'use strict';
/* eslint-env node */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine-phantom');

gulp.task('default', ['styles', 'lint'], function() {
    gulp.watch('css/**/*.css', ['styles']);
    gulp.watch('js/**/*.js', ['lint']);

    browserSync.init({
        server: './',
    });
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
            })
        )
        .pipe(gulp.dest('.dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    return (
        gulp
            .src(['js/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
            .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
            .pipe(eslint.failOnError())
    );
});

gulp.task('tests', function() {
    gulp.src('jasmine/spec/restaurant.js').pipe(
        jasmine({
            integration: true,
            vendor: 'js/**/*.js',
        })
    );
});
