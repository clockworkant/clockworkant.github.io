var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sass() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
};

function fonts() {
  console.log("in fonts");
  return gulp.src([
    'src/fonts/*',
  ]).pipe(gulp.dest('build/css/fonts'));
};

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/scss/*.scss", sass);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('fonts', fonts);
gulp.task('sass', sass);
gulp.task('serve', gulp.series(['fonts','sass'], serve));
gulp.task('default', gulp.series(['fonts','sass'], serve));
