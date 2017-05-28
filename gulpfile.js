var gulp = require('gulp')
,concat = require('gulp-concat')
,minify = require('gulp-minify-css')
,inline = require('gulp-inline')
,uglify = require('gulp-uglify')
,imagemin = require('gulp-imagemin')
,htmlmin = require('gulp-htmlmin');

// Compacta as imagens
gulp.task('build-img', function() {
  return gulp.src('src/**/*')
  .pipe(imagemin([
    imagemin.jpegtran({progressive : true})
  ]))
 .pipe(gulp.dest('dist/'))

});


// Faz inlining do CSS e JavaScript no HTML

gulp.task('inline', function() {
  return gulp.src('index.html')
  .pipe(inline({
    base: '/',
    // Comprime os scripts
    js: uglify,
 // Comprime as folhas de estilo
    css: minify,
    disabledTypes:['img']
 }))
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
 // Comprime o HTML
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build-img', 'inline'], function(){});
