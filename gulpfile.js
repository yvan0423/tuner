// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 上传文件至测试服务器
gulp.task('scp', function() {
    gulp.src('./js/*.js')
        .pipe(scp({

        }))
});

// 监听文件变化
gulp.task('watch', function() {
    gulp.run('lint', 'scripts');
})

// 启动本地服务
gulp.task('server', function() {
    connect.server({
        port: 8888,
        host: gulp.dev,
        livereload: true,
    });
})

// 默认任务
gulp.task('default', ['watch', 'server']);