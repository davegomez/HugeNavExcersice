var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function () {
	gulp.src(['src/sass/**/*.scss'])
			.pipe(sass())
			.pipe(gulp.dest('public/styles/css'))
			.pipe(concat('styles.css'))
			.pipe(gulp.dest('public/styles'));
});

gulp.task('watch', function () {
	gulp.watch('public/styles/sass/*.scss', ['sass'])
});