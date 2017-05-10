var gulp = require('gulp');
var less = require('gulp-less');
var cssMin = require('gulp-minify-css');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var autoPreFixer = require('gulp-autoprefixer');
var htmlMin = require('gulp-htmlmin');

/**
 * less编译
 */
gulp.task('less', ['clean'], function () {
    return gulp.src('static/less/*.less')
        .pipe(less())
        .pipe(concat('index.min.css'))
        .pipe(autoPreFixer({
            browsers: ['last 4 versions'],
            remove: true
        }))
        .pipe(cssMin())
        .pipe(rev())
        .pipe(gulp.dest('output/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('static/'));
});

/**
 * 实时同步版本号
 */
gulp.task('rev', ['less'], function () {

    //htmlMin插件配置项
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    gulp.src(['static/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(htmlMin(options))
        .pipe(gulp.dest('output/'));
});

/**
 * 编译文件清理
 */
gulp.task('clean', function () {
    return gulp.src('output/', {read: false})
        .pipe(clean());
});

/**
 * 热更新
 */
gulp.task('watch', function () {
    gulp.watch('static/less/*.less', ['default']);
});

/**
 * 默认任务设置
 */
gulp.task('default', ['rev']);