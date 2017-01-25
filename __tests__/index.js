'use strict'

import Nightmare from 'nightmare'
import http from 'http'
import finalhandler from 'finalhandler'
import connect from 'connect'
import serveStatic from 'serve-static'

/**
 * server
 */
const serve = serveStatic( 'dist/', {'index': ['index.html']} )

const server = http.createServer(function onRequest ( req, res ) {
  serve( req, res, finalhandler(req, res) )
})

/**
 * tests
 */
describe('PDF Viewer', function() {
  let nightmare

  // jest hooks
  beforeAll(function() {
    server.listen(3000)
  })

  beforeEach(function() {
    nightmare = Nightmare({
      show: false,
      width: 1024,
      height: 768
    })
  })

  afterEach(function() {
    nightmare.end()
  })

  afterAll(function() {
    server.close()
  })

  // tests
  it('should display the webpage', async () => {

    const content = await nightmare.goto('http://localhost:3000')
      .exists('#viewer')
      .end()

    expect(content).toBe(true)

  })

  it('should display demo pdf', async () => {

    const content = await nightmare.goto('http://localhost:3000')
      .wait('.textLayer > div:first-child')
      .evaluate(function () {
        return document.querySelector('.textLayer > div:first-child').textContent
      })
      .end()

    expect(content).toBe('Eloquent JavaScript')

  })

  it('should display number of pages', async () => {

    const pagesNumber = await nightmare.goto('http://localhost:3000')
      .wait('.textLayer > div:first-child')
      .evaluate(function () {
        return document.querySelector('#numPages').textContent
      })
      .end()

    expect(pagesNumber).toBe('of 490')

  })

})
