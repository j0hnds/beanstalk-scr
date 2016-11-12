'use strict'

const blessed = require('blessed')
const TopLevelAttributes = require('./stats_config').TopLevelAttributes
const HeaderLabels = require('./stats_config').HeaderLabels

class MenuBar {

  constructor (screen, clientApi, statsList, tubeList) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = statsList
    this._tubeList = tubeList
    this._menuBar = this._buildMenuBar(screen)
  }

  _buildMenuBar (screen) {
    return blessed.listbar({
      parent: screen,
      mouse: true,
      keys: true,
      top: 0,
      left: 0,
      height: 1,
      commands: {
        Invoke: {
          keys: [ 'i' ],
          callback: () => this._invoke()
        },
        Tubes: {
          keys: [ 't' ],
          callback: () => this._tubes()
        },
        Exit: {
          keys: [ 'q', 'escape' ],
          callback: () => this._exit()
        }
      }
    })
  }

  _invoke () {
    this._clientApi.get('', {})
      .then((data) => {
        let arr = TopLevelAttributes.map((item) => {
          return [ item, '' + data[item] ]
        })
        this._statsList.show()
        this._statsList.left = 0
        this._statsList.setData(HeaderLabels.concat(arr))
        this._tubeList.hide()
        this._tubeList.setData([])
        this._screen.render()
      })
      .catch((err) => {
        console.error('There was an error: %s', err)
      })
  }

  _tubes () {
    this._clientApi.get('/tubes', {})
      .then((data) => {
        let hdr = [ [ 'Tubes' ] ]
        let arr = data.map((currentValue, index, arr) => {
          return [ currentValue ]
        })
        this._tubeList.show()
        this._tubeList.setData(hdr.concat(arr))
        this._tubeList.focus()
        this._statsList.hide()
        this._statsList.left = 20
        this._screen.render()
      })
      .catch((err) => {
        console.error('There was an error: %s', err)
      })
  }

  _exit () {
    process.exit(0)
  }

}

module.exports.MenuBar = MenuBar
