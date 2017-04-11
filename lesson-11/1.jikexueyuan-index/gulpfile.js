var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var autoPreFixer = require('gulp-autoprefixer');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');

/**
 * less编译
 */
gulp.task('less', ['clean'], function () {
    return gulp.src('static/css/less/index.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('index.min.css'))
        .pipe(replace('../../img', '../img'))
        .pipe(autoPreFixer({
            browsers: ['last 4 versions'],
            remove: true
        }))
        .pipe(cssMin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/css'));
});

/**
 * 编译文件清理
 */
gulp.task('clean', function () {
    return gulp.src(['static/css/*.css', 'static/css/*.map'], {read: false})
        .pipe(clean());
});

/**
 * 热更新
 */
gulp.task('watch', function () {
    gulp.watch('static/css/less/*.less', ['default']);
});

/**
 * 默认任务设置
 */
gulp.task('default', ['less']);