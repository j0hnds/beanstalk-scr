'use strict'

const blessed = require('blessed')

class BeanstalkScreen {
  constructor (clientApi) {
    this._screen = blessed.screen({ smartCSR: true })
    this._screen.title = 'Beanstalk API'
    this._clientApi = clientApi
  }

  render () {
    this._screen.render()
  }

  screen () { return this._screen }
}

module.exports.BeanstalkScreen = BeanstalkScreen

