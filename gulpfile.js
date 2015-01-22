var gulp = require('gulp'),
    jsdoc = require("gulp-jsdoc");

gulp.task('default');

gulp.src(["./src/js/dropdown-menu.js", "./src/js/menu-builder.js"])
  .pipe(jsdoc('./docs'));