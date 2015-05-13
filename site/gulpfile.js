var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat-limit');
var gulpif = require('gulp-if');
var sprite = require('css-sprite').stream;
var minifyHTML = require('gulp-minify-html');




gulp.task('default', function() {
  // place code for your default task here

});


/*JS Comperssor*/
gulp.task('compress', function() {
  return gulp.src('bootstrap-3.3.2-dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});


/*CSS Sprite map generator*/
gulp.task('sprites', function () {
  return gulp.src('./img/*.png')
    .pipe(sprite({
      name: 'sprite',
      style: 'sprite.css',
      cssPath: './img',
      processor: 'css'
    }))
    .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/scss/')))
});


/*CSS Concat*/
gulp.task('concat', function() {
    gulp.src('./css/*.css')
        .pipe(concat('style-.css', 256))//2KB
        .pipe(gulp.dest('./combinedCSS'));
});



/*CSS Minifyer*/
gulp.task('minify-css', function() {
  return gulp.src('./css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
 

 /*html minifyer*/
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});