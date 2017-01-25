import gulp from 'gulp'
import gutil from 'gulp-util'
import connect from 'gulp-connect'
// import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

export default () => {

  return gulp.src([
      'src/lib/pdfjs/*.js',
      'src/*.js',
    ]) // respect the order
    // .pipe( babel({
    //   presets: ['es2015']
    // }) )
    .pipe( !gutil.env.dist ? gutil.noop() : uglify() )
    .pipe( gulp.dest('dist/scripts/') )
    .pipe( connect.reload() )
}
