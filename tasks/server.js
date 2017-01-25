import gulp from 'gulp'
import connect from 'gulp-connect'

export default () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
}

