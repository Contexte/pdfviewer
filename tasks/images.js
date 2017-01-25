import gulp from 'gulp'
import gutil from 'gulp-util'
import connect from 'gulp-connect'
import imagemin from 'gulp-imagemin'

export default () => {
  return gulp.src('src/images/**/*')
    .pipe( !gutil.env.dist ? gutil.noop() : imagemin({
      optimizationLevel: 7,
      progressive: true
    }) )
    .pipe( gulp.dest('dist/images/') )
    .pipe( connect.reload() )
}
