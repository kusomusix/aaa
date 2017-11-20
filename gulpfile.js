var gulp = require('gulp');
var sass = require('gulp-sass');
//var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src([
    '_source/scss/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('html'))
//  .pipe(browserSync.stream());
});

gulp.task('copy', function() {
  return gulp.src([
    '_source/scss/*',
    '!_source/scss/*.scss'
  ])
  .pipe(gulp.dest('html'))
//  .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  // browserSync.init({
  //   server: {
  //     baseDir: "html"
  //   }
  // });

  gulp.watch(['_source/scss/*.scss'], ['sass']);
  gulp.watch([
    '_source/scss/*',
    '!_source/scss/*.scss'
    ], ['copy']);
});

gulp.task('default', ['copy', 'sass', 'watch']);

