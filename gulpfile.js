var gulp = require('gulp');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');

function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

gulp.task('minify', function(){
	return gulp.src('js/*.js')
	.pipe(plumber()) //allows gulp to run even if there are errors in css and js
	.on('error', errorLog)
	.pipe(uglify())
	.pipe(gulp.dest('minjs'));
});


gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function(){
	gulp.watch('js/*.js', ['minify', 'jshint'])
});


gulp.task('default', ['minify', 'watch']);