var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    karma = require('karma').server;

gulp.task('default', ['sass', 'concat:dist', 'compress', 'watch']);

gulp.task('sass', function() {
  gulp.src(['src/sass/{,*/}*.scss'])
      .pipe(sass())
      .pipe(gulp.dest('public/styles/css'))
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('public/styles'));
});

gulp.task('concat:dist', function() {
  // gulp.src(['src/js/get-json.js', 'src/js/menu-builder.js', 'src/js/init.js'])
  gulp.src('src/js/{,*/}*.js')
    .pipe(concat('scripts.js', {process: function(src) { return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
    .pipe(concat.header('(function (window, document, undefined) {\n\'use strict\';\n\n'))
    .pipe(concat.footer('\n})(window, document);\n'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('compress', function() {
  gulp.src('public/scripts/scripts.js')
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('tdd', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('watch', function() {
  gulp.watch('src/sass/{,*/}*.scss', ['sass']);
  gulp.watch('src/js/{,*/}*.js', ['concat:dist']);
  gulp.watch('public/scripts/scripts.js', ['compress']);
});