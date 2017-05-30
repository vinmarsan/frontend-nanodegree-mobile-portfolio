var gulp = require('gulp')
,concat = require('gulp-concat')
,clean = require('gulp-clean')
,minify = require('gulp-minify-css')
,inline = require('gulp-inline')
,uglify = require('gulp-uglify')
,imagemin = require('gulp-imagemin')
,usemin = require('gulp-usemin')
,cssmin = require('gulp-cssmin')
,htmlmin = require('gulp-htmlmin')
,cleanCss = require('gulp-clean-css')
,autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['copy'], function() {
	gulp.start('build-img','scripts','inline','styles','minHtml');
});

gulp.task('copy', ['clean'], function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('build-img', function() {

  return gulp.src('src/img/**/*')
    .pipe(imagemin([
			imagemin.jpegtran({progressive:true}),
			imagemin.optipng({optimizationEvel: 5})
		]))
    .pipe(gulp.dest('dist/img'));
});

/*gulp.task('usemin', function() {
  return gulp.src('index.html')
    .pipe(usemin({
      js: [uglify],
      css: [autoprefixer,cssmin]
    }))
    .pipe(gulp.dest('dist'));
});*/

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));

});

gulp.task('inline', function(){
	return gulp.src('src/*.html')
		pipe(inline())
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', function(){
	return gulp.src('src/css/*.css')
		.pipe(minify())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('minHtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
})
