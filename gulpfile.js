// Include gulp
var gulp = require('gulp');

// Incluir plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer-stylus');
var nano = require('gulp-cssnano');
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
    // .pipe(browserSync.stream());
});

// Compila stylus
gulp.task('stylus', function() {
  return gulp.src('styl/*.styl')
    .pipe(stylus({
      compress: false,
      use: [autoprefixer()]
    }))
    .pipe(gulp.dest('css'));
    // .pipe(browserSync.stream());
});

// Concatena y minifica js
gulp.task('scripts', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/foundation/js/foundation.min.js', 'js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/concat'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/concat'));
    // .pipe(browserSync.stream());
});

// Concatena y minifica css
gulp.task('concat-css', function() {
  return gulp.src(['css/app.css', 'css/estilos.css'])
    .pipe(concat('todo.css'))
    .pipe(gulp.dest('css/concat'))
    .pipe(rename('todo.min.css'))
    .pipe(nano())
    .pipe(gulp.dest('css/concat'));
});

// Servidor estatico + Vigila archivos para modificaciones
gulp.task('serve', ['sass', 'stylus', 'scripts', 'concat-css'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('styl/*.styl', ['stylus']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Static server
// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//         baseDir: "./"
//     }
//   });
// });


// Default Task
gulp.task('default', ['serve', 'lint']);
