'use strict'

const blessed = require('blessed')
const TubeAttributes = require('./stats_config').TubeAttributes
const HeaderLabels = require('./stats_config').HeaderLabels

class TubeList {
  constructor (screen, clientApi, statsList) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = statsList
    this._tubeList = this._window(screen)
    this._tubeList.on('select', (data, index) => this.select(data, index))
  }

  _window (screen) {
    return blessed.listtable({
      parent: screen,
      mouse: true,
      top: 2,
      left: 0,
      height: '100%',
      align: 'left',
      interactive: true,
      keys: [ 'up', 'down' ],
      vi: true,
      scrollbar: {
        bg: 'red',
        fg: 'blue'
      },
      style: {
        cell: {
          selected: {
            inverse: true
          },
          hover: {
            bg: 'green'
          }
        },
        header: {
          bold: true
        }
      }
    })
  }

  tubeList () { return this._tubeList }

  select (data, index) {
    this._clientApi.get('/tubes/' + this._clientApi.urlTubeName(data.content.trim()), {})
      .then((data) => {
        let arr = TubeAttributes.map((item) => {
          return [ item, '' + data[item] ]
        })
        this._statsList.show()
        this._statsList.setData(HeaderLabels.concat(arr))
        this._screen.render()
      })
  }
}

module.exports.TubeList = TubeList
