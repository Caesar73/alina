

var gulp     = require('gulp');
var babel    = require('gulp-babel');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del      = require('del');

var less            = require('gulp-less');
var sass            = require('gulp-sass');
// var rubyScss        = require('gulp-ruby-sass');
var scssLint        = require('gulp-scss-lint');
var scssLintStylish = require('gulp-scss-lint-stylish');
var sourcemaps      = require('gulp-sourcemaps');

var paths = {
  srcUrl: {
    baseUrl: 'build'
  },
  styles: {
    src: '_sass/*.scss',
    dest: 'build/css/'
  },
  scripts: {
    // src: 'src/scripts/**/*.js',
    // dest: 'build/scripts/'
  },
  less: {
    src: 'assets/less/*.less',
    dest: 'build/less/',
    maps: 'build/maps/less/'
  },
  sass: {
    src: 'assets/sass/*.scss',
    dest: 'build/sass/',
    maps: 'build/maps/sass/'
  }

};


// function scripts () {
//   return gulp.src(paths.scripts.src, { sourcemaps: true })
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(concat('main.min.js'))
//     .pipe(gulp.dest(paths.scripts.dest));
// }

function clean (cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  // return del([ paths.srcUrl.baseUrl ], cb);
  return del([ paths.styles.dest ], cb);
}

function cleanSass (cb) {
  return del([ '_site/' + paths.sass.dest, paths.sass.dest ], cb);
}

function cleanSassMaps (cb) {
  return del([ paths.sass.maps ], cb);
}

function cleanLess (cb) {
  return del([ paths.less.dest ], cb);
}



/*
gulp.task( 'clean',  gulp.series(clean) );
gulp.task( 'styles', gulp.series('clean', styles) );
gulp.task('default', gulp.series(gulp.parallel('styles'), function() {

}));
*/

// var build   = gulp.series( clean, gulp.parallel( styles ) );
// // var build   = gulp.series( gulp.parallel( styles ) );
// var all     = gulp.parallel( styles );
// gulp.task('default', build);

gulp.task('sass', gulp.series( cleanSass, function() {
  console.log('sass');
  return gulp.src( paths.sass.src )
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest( paths.sass.dest ));
}));

gulp.task('sass-minify', gulp.series( cleanSass, cleanSassMaps, function() {
  console.log('sass-minify');
  return gulp.src( paths.sass.src )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps/sass'))
    .pipe(gulp.dest( paths.sass.dest ));
}));

gulp.task('less', gulp.series( cleanLess, function() {
  console.log('less');
  return gulp.src( paths.less.src )
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest( paths.less.dest ));
}));




