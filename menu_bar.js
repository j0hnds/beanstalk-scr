'use strict'

const TopLevelAttributes = require('./stats_config').TopLevelAttributes
const HeaderLabels = require('./stats_config').HeaderLabels

class MenuBar {
  constructor (screen, clientApi, statsList, tubeList) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = statsList
    this._tubeList = tubeList
  }

  invoke () {
    this._clientApi.get('', {})
      .then((data) => {
        let arr = TopLevelAttributes.map((item) => {
          return [ item, '' + data[item] ]
        })
        this._statsList.setData(HeaderLabels.concat(arr))
        this._tubeList.setData([])
        this._screen.render()
      })
  }

  tubes () {
    this._clientApi.get('/tubes', {})
      .then((data) => {
        let hdr = [ [ 'Tubes' ] ]
        let arr = data.map((currentValue, index, arr) => {
          return [ currentValue ]
        })
        this._tubeList.setData(hdr.concat(arr))
        this._tubeList.focus()
        this._screen.render()
      })
  }

  exit () {
    process.exit(0)
  }
}

module.exports.MenuBar = MenuBar
