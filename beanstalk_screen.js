'use strict'

const blessed = require('blessed')

class BeanstalkScreen {
  constructor (clientApi) {
    this._screen = blessed.screen({ smartCSR: true })
    this._screen.title = 'Beanstalk API'
  }

  render () {
    this._screen.render()
  }
}

module.exports.BeanstalkScreen = BeanstalkScreen

