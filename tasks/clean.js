import del from 'del'

export default () => {
  return del( ['dist/'] )
}
