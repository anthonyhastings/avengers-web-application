'use strict';

/**
 *  Pre-compiles handlebars templates to JS file.
 *  NOTE: Only needed for RequireJS workflow.
 *
 *  Example Usage:
 *  gulp templates
 */

var gulp = require('gulp'),
    globalSettings = require('../../_global'),
    common = require('./_common'),
    through2 = require('through2'),
    wrap = require('gulp-wrap'),
    handlebars = require('gulp-handlebars');

/**
 *  Examines the file in the stream / buffer and based on
 *  the filename will either wrap the content in a partial
 *  or template wrapper.
 */
function handlebarsWrapper() {
    return through2.obj(function(file, enc, callback) {
        var fileName = file.path.split('/').pop(),
            partialRegex = new RegExp(/^_/),
            isPartial = partialRegex.test(fileName);

        if (!isPartial) {
            file.contents = new Buffer('return Handlebars.template(' + file.contents + ')', 'utf-8');
        } else {
            var partialName = fileName.replace('_', '').replace('.js', '');
            file.contents = new Buffer('Handlebars.registerPartial("' + partialName + '", Handlebars.template(' + file.contents + '));', 'utf-8');
        }

        return callback(null, file);
    });
};

gulp.task('templates', function() {
    if (globalSettings.moduleFormat !== 'requirejs') {
        console.log('Templates: Cancelling. Browserify doesn\'t need to run the templates task.');
        return;
    }

    var sourcePath = common.srcDirectory + common.srcPath;
    return gulp.src([sourcePath])
        .pipe(handlebars())
        .pipe(handlebarsWrapper())
        .pipe(wrap("define(['handlebars'], function(Handlebars) {\n\n<%= contents %>\n\n});"))
        .pipe(gulp.dest(common.destPath));
});