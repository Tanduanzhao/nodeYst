var gulp = require('gulp');

const imagemin = require('gulp-imagemin');
gulp.task('imagesDes',function(){
	gulp.src('./public/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/images/'));
})
gulp.task('default',['imagesDes']);