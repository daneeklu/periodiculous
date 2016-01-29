var gulp = require('gulp')
var babel = require('gulp-babel')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var webserver = require('gulp-webserver')

gulp.task('default', ['runbabel', 'templates', 'sass', 'watch', 'webserver'])

gulp.task('runbabel', () => {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('sass', () => {
  gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
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
  gulp.watch('src/*.js', ['runbabel'])
  gulp.watch('src/css/*.scss', ['sass'])
  gulp.watch('view/*.jade', ['templates'])
})
