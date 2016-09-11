var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    myth = require('gulp-myth'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

// Move html
gulp.task('html', function() {
  gulp.src('./dev/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

gulp.task('images', function() {
  gulp.src('./dev/images/*.png')
    .pipe(gulp.dest('./public/images/'));
});

// Compile less, then move
gulp.task('less', function() {
  gulp.src('./dev/css/*.css')
    .pipe(gulp.dest('./public/css/'));

  gulp.src('./dev/css/*.less')
    .pipe(less())
    .pipe(myth())
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload());
});

gulp.task('vendor-js', function() {
  gulp.src(['./dev/js/vendor/**/*.js'])
    .pipe(gulp.dest('./public/js'));
});

// Concat js, then move
gulp.task('js', function() {
  gulp.src('./dev/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});

// Start web-server
gulp.task('connect', function() {
  connect.server({
    port: 8000,
    root: 'public',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.run('html');
  gulp.run('images');
  gulp.run('less');
  gulp.run('vendor-js');
  gulp.run('js');

  livereload.listen();
  gulp.watch('dev/*.html', ['html']);
  gulp.watch('dev/images/*.png', ['images']);
  gulp.watch('dev/js/*.js', ['js']);
  gulp.watch('dev/css/*.less', ['less']);

  gulp.run('connect');
});
