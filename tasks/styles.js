import gulp from 'gulp'
import gutil from 'gulp-util'
import connect from 'gulp-connect'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default () => {

  const plugins = [
    autoprefixer({browsers: ['last 1 version']})
  ]

  if ( gutil.env.dist ) plugins.push( cssnano() )

  return gulp.src( ['src/styles/*.css'] )
    .pipe( postcss(plugins) )
    .pipe( gulp.dest('dist/styles') )
    .pipe( connect.reload() )
}
