// gulpfile.js
const gulp = require('gulp')
const sass = require('gulp-sass')

// a task to generate the css with sass
gulp.task('css', function() {
	return gulp
		.src('./_includes/scss/main.scss')
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest('./css'))
})

gulp.task('watch', function() {
	gulp.watch('./_includes/scss/**/*.scss', gulp.parallel('css'))
})
