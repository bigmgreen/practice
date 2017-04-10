/**
 * Created by Administrator on 2017/4/9 0009.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');

gulp.task('less', function () {
   return gulp.src(['./static/less/base.less', './static/less/index.less'])
       .pipe(less())
       // .pipe(cssmin())
       .pipe(gulp.dest('./static/'))
});

gulp.task('watch', function () {
   gulp.watch('./static/less/index.less', ['less']);
});