// 引入 gulp
import gulp from 'gulp'; 

// 引入组件
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import connect from 'gulp-connect';
import path from 'path';
import babel from 'gulp-babel';
import scp from 'gulp-scp2';
import changes from 'gulp-changed';
import minifyhtml from 'gulp-minify-html';

// 合并，压缩文件
gulp.task('scripts', () => {
    const dest = './dist';
    gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dest))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    gulp.src('./index.html')
        .pipe(changes(dest))
        .pipe(minifyhtml({ quotes: true }))
        .pipe(gulp.dest(dest));
});

// 上传文件至测试服务器
gulp.task('scp', () => {
    gulp.src('./dist/*.js')
        .pipe(scp({
            host: '121.40.50.72',
            port: 60919,
            username: 'root',
            password: 'FingerDev20140919',
            dest: 'home/admin/deploy/ROOT/static/tuner'
        }))
        .on('error', (err) => {
            console.log(err);
        })
});

// 监听文件变化
gulp.task('watch', () => {
    gulp.run('scripts');
})

// 启动本地服务
gulp.task('server', () => {
    connect.server({
        port: 8888,
        host: gulp.dev,
        livereload: true,
    });
})

// 默认任务
gulp.task('default', ['watch', 'server']);