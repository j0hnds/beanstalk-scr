'use strict'

const blessed = require('blessed')

class MessageBox {
  constructor (screen) {
    this._screen = screen
    this._messageBox = this._window(screen)
    this._messageBox.on('select', (data, index) => this.select(data, index))
    this._messageBox.on('b', (data, index) => this.back(data, index))
    this._previous = null
  }

  _window (screen) {
    return blessed.listtable({
      parent: screen,
      mouse: true,
      top: 2,
      left: 60,
      width: 40,
      height: 14,
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

  set previous (prev) {
    this._previous = prev
  }

  back (data, index) {
    if (this._previous) {
      this._previous.focus()
    }
  }

  messageBox () { return this._messageBox }

  select (data, index) {
    if (this._previous) {
      this._previous.focus()
    }
    this._messageBox.hide()
    this._screen.render()
  }
}

module.exports.MessageBox = MessageBox
