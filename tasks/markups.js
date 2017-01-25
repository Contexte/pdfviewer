import gulp from 'gulp'
import connect from 'gulp-connect'

export default () => {
  return gulp.src( ['src/views/**/*'] )
    .pipe( gulp.dest('dist/') )
    .pipe( connect.reload() )
}
