var gulp = require('gulp')
  , minifyCSS = require('gulp-minify-css')
  , uglify = require('gulp-uglify')
  , gulpJade = require('gulp-jade')
  , rename = require('gulp-rename')
  , del = require('del')
  , sass = require('gulp-sass')
  , minifyInline = require('gulp-minify-inline')
  , watch = require('gulp-watch')
  , affected = require('gulp-jade-find-affected')
  , gulpFilter = require('gulp-filter')
  ;

var paths = {
  jade: ['src/**/*.jade'],
  jadeExcluded: ['*', '!src/include/*.jade'],
  jsLib: [], // ['']
  js: 'src/js/**/*',
  sass: 'src/css/**/*.s?ss',
  css: 'src/css/**/*.css',
  static: ['src/img/**/*', 'src/font/**/*'],
};

// Dev related tasks

gulp.task('dev-clean-html', function() {
  return del(['src/**/*.html']);
});
gulp.task('dev-clean-sass.css', function() {
  return del(['src/css/**/*.s?ss.css']);
});
gulp.task('dev-clean-js-lib', function(cb) {
  return del(['src/js/lib']);
});

gulp.task('dev-obtain-js-lib', ['dev-clean-js-lib'], function() {
  return gulp.src(paths.jsLib)
    .pipe(gulp.dest('src/js/lib/'))
    ;
});

gulp.task('dev-translate-jade', ['dev-clean-html'], function() {
  return gulp.src(paths.jade)
    .pipe(gulpFilter(paths.jadeExcluded))
    .pipe(gulpJade({
      pretty: true,
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('src/'))
    ;
});

gulp.task('dev-watch-jade', function() {
  watch(paths.jade)
    .pipe(affected())
    .pipe(gulpFilter(paths.jadeExcluded))
    .pipe(gulpJade({
      pretty: true,
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('src/'))
    ;
});

gulp.task('dev-translate-sass', ['dev-clean-sass.css'], function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      suffix: '.sass'
    }))
    .pipe(gulp.dest('src/css'))
    ;
});

gulp.task('dev-watch-sass', function() {
  watch(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      suffix: '.sass'
    }))
    .pipe(gulp.dest('src/css'))
    ;
});

// Build related tasks

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copy-static', ['clean'], function() {
  return gulp.src(paths.static).pipe(gulp.dest('dist/'));
});

gulp.task('compress-css', ['clean', 'dev-translate-sass'], function() {
  return gulp.src(paths.css)
    .pipe(minifyCSS({ keepBreaks: false, keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist/css/'))
    ;
});

gulp.task('compress-js', ['clean', 'dev-obtain-js-lib'], function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    ;
});

gulp.task('translate-jade', ['clean'], function() {
  return gulp.src(paths.jade)
    .pipe(gulpFilter(paths.jadeExcluded))
    .pipe(gulpJade())
    .pipe(rename({extname: '.html'}))
    .pipe(minifyInline())
    .pipe(gulp.dest('dist/'))
    ;
});


gulp.task('dev', ['dev-translate-jade', 'dev-watch-jade', 'dev-translate-sass', 'dev-watch-sass', 'dev-obtain-js-lib']);

gulp.task('build', ['compress-css', 'compress-js', 'translate-jade', 'copy-static']);

gulp.task('default', ['dev']);
