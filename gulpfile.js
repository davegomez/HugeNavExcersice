var gulp = require('gulp'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		karma = require('karma').server;

gulp.task('default', ['sass', 'compress', 'test', 'watch']);

gulp.task('sass', function () {
	gulp.src(['src/sass/**/*.scss'])
			.pipe(sass())
			.pipe(gulp.dest('public/styles/css'))
			.pipe(concat('styles.css'))
			.pipe(gulp.dest('public/styles'));
});

gulp.task('compress', function() {
  gulp.src('src/js/scripts.js')
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('watch', function () {
	gulp.watch('public/styles/sass/*.scss', ['sass']);
	gulp.watch('src/js/scripts.js', ['compress']);
	gulp.watch('spec/**/*.js', ['test']);
	gulp.watch('src/js/**/*.js', ['test']);
});