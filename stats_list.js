'use strict'

const blessed = require('blessed')

class StatsList {
  constructor (screen, clientApi) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = this._window(screen)
  }

  _window (screen) {
    return blessed.listtable({
      parent: screen,
      mouse: true,
      top: 2,
      left: 20,
      height: 14,
      align: 'right',
      vi: true,
      style: {
        header: {
          bold: true
        }
      }
    })
  }

  statsList () { return this._statsList }
}

module.exports.StatsList = StatsList
