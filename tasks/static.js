import gulp from 'gulp'
import connect from 'gulp-connect'

export default () => {
  return gulp.src( ['src/static/**/*'] )
    .pipe( gulp.dest('dist/') )
    .pipe( connect.reload() )
}
