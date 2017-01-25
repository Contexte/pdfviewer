'use strict'

import gulp from 'gulp'
import runSequence from 'run-sequence'
import cleanTask from './tasks/clean'
import imagesTask from './tasks/images'
import markupsTask from './tasks/markups'
import scriptsTask from './tasks/scripts'
import serverTask from './tasks/server'
import staticTask from './tasks/static'
import stylesTask from './tasks/styles'

gulp.task('clean', cleanTask)
gulp.task('images', imagesTask)
gulp.task('markups', markupsTask)
gulp.task('scripts', scriptsTask)
gulp.task('server', serverTask)
gulp.task('static', staticTask)
gulp.task('styles', stylesTask)

gulp.task('build', (cb) => {
  runSequence(
    'clean',
    ['markups', 'scripts', 'styles', 'images', 'static'],
    cb)
})

gulp.task('watch', ['build'], () => {
  gulp.start('server')

  gulp.watch( ['src/images/**/*'], ['images'] )
  gulp.watch( ['src/views/**/*'], ['markups'] )
  gulp.watch( ['src/**/*.js'], ['scripts'] )
  gulp.watch( ['src/static/**/*'], ['static'] )
  gulp.watch( ['src/styles/**/*'], ['styles'] )
})

gulp.task('default', ['watch'])
