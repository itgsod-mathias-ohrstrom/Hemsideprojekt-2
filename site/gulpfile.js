var gulp       = require('gulp');
var minifyCss  = require('gulp-minify-css');
var uglify     = require('gulp-uglify');
var concatCss  = require('gulp-concat-css');
var gulpif     = require('gulp-if');
var sprite     = require('css-sprite').stream;
var minifyHTML = require('gulp-minify-html');
var plumber    = require('gulp-plumber');




gulp.task('default', function() {

});


/*JS Comperssor*/
gulp.task('compress', function() {
  return gulp.src('bootstrap-3.3.2-dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});


/*CSS Sprite map generator*/
gulp.task('sprites', function() {
  return gulp.src('./img/*.png')
    .pipe(sprite({
      name: 'sprite',
      style: 'sprite.css',
      cssPath: './img',
      processor: 'css'
    }))
    .pipe(gulpif('*.png', gulp.dest('./img/'), gulp.dest('./css/')));
});


/*CSS Concat*/
gulp.task('default', function() {
  return gulp.src('./*.css')
    .pipe(concatCss("./dist/all.css"))
    .pipe(gulp.dest('./dist'));
});


/*CSS Minifyer*/
gulp.task('minify-css', function() {
  return gulp.src('./**/*.css')
    .pipe(minifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist'));
});


/*HTML minifyer*/
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});
