"use strict";

var browserify = require('browserify')
    ,plumber = require('gulp-plumber')
    ,watch = require('gulp-watch')
    ,gulp = require('gulp')
    ,source = require('vinyl-source-stream')
    ,literalify = require('literalify')
    ,connect = require('connect')
    ,fs = require('fs')
    ,serveStatic = require('serve-static')
    ,Promise = require('promise')
    ,babel = require("gulp-babel");

var browOpt = {standalone: 'atlant'};
var dest = 'lib/';

var getLocalIndex = function(req, res, next){
    return fs.createReadStream('examples/index.html', {encoding: 'utf8'})
        .pipe(res);
}


/** Examples local server */
// not in use actually
gulp.task('examples', function() {
    return connect()
        .use(serveStatic('examples/'))
        .use(serveStatic('lib/'))
        .use(serveStatic('/bower_components/bacon/dist/'))
        .use(serveStatic('/bower_components/lodash/dist/'))
        .use(serveStatic('/bower_components/react/'))
        .use(getLocalIndex)
        .listen(9500);
});

gulp.task('watch', function() {
        return gulp
            .src(['src/**/*.js', 'src/**/*.sjs', 'src/**/*.ls'])
            .pipe( plumber() )
            .pipe( watch( function(){
                var b = browserify( './src/atlant.js' );
                b.ignore('react');
            //    b.transform(sweetify);
                b.transform(literalify.configure({
                    react: 'window.React'
                    ,lodash: 'window._'
                    ,baconjs: 'window.Bacon'
                    ,promise: 'window.Promise'
                }));

                b.bundle({ standalone: 'Atlant' }).pipe(source('./atlant.js'))
                    .pipe( gulp.dest(dest) )
            }))
});

gulp.task('default', ['watch']);
