'use strict'

const blessed = require('blessed')

class StatsList {
  constructor (screen, clientApi, messageBox) {
    this._screen = screen
    this._clientApi = clientApi
    this._messageBox = messageBox
    this._statsList = this._window(screen)
    this._statsList.key('b', (data, index) => this.back(data, index))
    this._statsList.key('d', (data, index) => this.drain(data, index))
    this._statsList.key('p', (data, index) => this.peek(data, index))
    this._previous = null
  }

  _window (screen) {
    return blessed.listtable({
      parent: screen,
      mouse: true,
      top: 2,
      left: 20,
      height: 14,
      align: 'right',
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

  statsList () { return this._statsList }

  set previous (prev) {
    this._previous = prev
  }

  back (data, index) {
    if (this._previous) {
      this._previous.focus()
    }
  }

  drain (data, index) {
    let tube = this._statsList.rows[0][1]
    this._clientApi.delete(`/${tube}`, {})
      .then((data) => {
        this._messageBox.show()
        this._messageBox.setData([[ 'Message' ], [JSON.stringify(data)]])
        this._messageBox.focus()
        this._screen.render()
      })
      .catch((err) => console.err(err.stack || err))
  }

  peek (data, index) {
    let tube = this._statsList.rows[0][1]
    let state = this._statsList.rows[this._statsList.selected][0]
    this._clientApi.get(`/${tube}/${state}`, {})
      .then((data) => {
        this._messageBox.show()
        this._messageBox.setData([[ 'Message' ], [JSON.stringify(data)]])
        this._messageBox.focus()
        this._screen.render()
      })
  }
}

module.exports.StatsList = StatsList
