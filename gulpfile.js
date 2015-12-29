// Include gulp
var gulp = require('gulp');

// Incluir plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compila sass
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
    .pipe(browserSync.stream());
});

// Compila stylus
gulp.task('stylus', function() {
  return gulp.src('styl/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('css'));
    .pipe(browserSync.stream());
});

// Concatena y minifica js
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
    .pipe(browserSync.stream());
});

// Vigila archivos para modificaciones
// gulp.task('watch', function() {
//   gulp.watch('js/*.js', ['lint', 'scripts']);
//   gulp.watch('scss/*.scss', ['sass']);
//   gulp.watch('styl/*.styl', ['stylus']);
// });

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'stylus', 'scripts'], function() {
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('styl/*.styl', ['stylus']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});


// Default Task
gulp.task('default', ['serve', 'lint']);
