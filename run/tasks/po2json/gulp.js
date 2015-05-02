'use strict';

/**
 *  Converts PO catalogs into JSON catalogs.
 *
 *  Example Usage:
 *  gulp po2json
 */

var gulp = require('gulp'),
    po2json = require('gulp-po2json');

gulp.task('po2json', function () {
    return gulp.src(['./locales/*.po'])
        .pipe(po2json({
            format: 'jed1.x',
            pretty: true
        }))
        .pipe(gulp.dest('./locales/'));
});