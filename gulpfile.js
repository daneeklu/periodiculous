var gulp = require('gulp')
var babel = require('gulp-babel')
var jade = require('gulp-jade')
var webserver = require('gulp-webserver')

//CSS
var sass = require('gulp-sass')
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


gulp.task('default', ['runbabel', 'templates', 'sass', 'watch', 'webserver'])

gulp.task('runbabel', () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public/js'))
})

gulp.task('sass', () => {
  gulp.src('src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('public/css'))
})

gulp.task('templates', () => {
  var myLocals = {}
  gulp.src('view/[^_]*.jade')
    .pipe(jade({
      locals: myLocals
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('webserver', () => {
  var options = {port: 1337}
  gulp.src('public')
    .pipe(webserver(options))
})

gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['runbabel'])
  gulp.watch('src/css/*.scss', ['sass'])
  gulp.watch('view/*.jade', ['templates'])
})
