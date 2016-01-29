var gulp = require('gulp')
var babel = require('gulp-babel')
var jade = require('gulp-jade')
var webserver = require('gulp-webserver')

gulp.task('default', ['runbabel', 'templates', 'watch', 'webserver'])

gulp.task('runbabel', () => {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('templates', () => {
  var myLocals = {}
  gulp.src('view/*.jade')
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
  gulp.watch('view/*.jade', ['templates'])
})
