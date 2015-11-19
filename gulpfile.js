var gulp = require('gulp');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');

function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

gulp.task('scripts', function(){
	return gulp.src('js/*.js')
	.pipe(plumber()); //allows gulp to run even if there are errors in css and js
	.on('error', errorLog)
	.pipe(uglify())
	.pipe(gulp.dest('minjs'));
});

gulp.task('imagecompress', function(){
	gulp.src('img/*')
	.pipe(imagemin())
	.pipe.gulp.dest('build/img')
});



gulp.task('watch', function(){
	gulp.watch('js/*.js', [scripts])
});


gulp.task('default', ['scripts', 'watch']);