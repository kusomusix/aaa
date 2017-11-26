var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber'); //監視中のエラー防止
var notify  = require('gulp-notify'); //デスクトップ通知
//var browserSync = require('browser-sync').create();

//option
var paths = {
  srcDir : '_source',
  dstDir : 'dist'
}

//sass
gulp.task('sass', function(){
  var srcGlob = path.join( paths.srcDir, '_scss', '*.scss' );
  var dstGlob = path.join( paths.dstDir, 'css' )
  var errorMessage = "Error: <%= error.message %>";

	gulp.src( srcGlob )
//  gulp.src('./_source/_scss/*.scss') //タスクで処理するソースの指定
    .pipe(plumber({
      errorHandler: notify.onError( errorMessage )
    }))
    .pipe(sass()) //処理させるモジュールを指定
    .pipe(gulp.dest(dstGlob)); //保存先を指定
//    .pipe(connect.reload());
});

//copy
gulp.task('copy', function(){
  var srcGlob = paths.srcDir + '/*.html';
  var dstGlob = paths.dstDir;

  gulp.src(srcGlob)
    .pipe(gulp.dest(dstGlob));
//    .pipe(connect.reload());
});

//watch
//gulp.task('watch', function(){
gulp.task('watch', ['sass', 'copy'], function(){
  var scssWatchGlob = paths.srcDir + '_scss/*.scss';
  var htmlWatchGlob = paths.srcDir + '/*.html';

  gulp.watch(scssWatchGlob, ['sass']);
  gulp.watch(htmlWatchGlob, ['copy']);
});

//server
gulp.task('serve', function(){
  connect.server({
    root: paths.dstDir,
//    livereload: true
  });
});

//gulp.task('default', ['sass']);
gulp.task('default', ['watch', 'serve']);