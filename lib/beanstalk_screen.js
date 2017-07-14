'use strict'

const blessed = require('blessed')
const MessageBox = require('./message_box').MessageBox
const TubeList = require('./tube_list').TubeList
const StatsList = require('./stats_list').StatsList
const MenuBar = require('./menu_bar').MenuBar

class BeanstalkScreen {

  constructor (clientApi) {
    this._screen = blessed.screen({ smartCSR: true })
    this._screen.title = 'Beanstalk API'

    this._messageBox = new MessageBox(this._screen)
    this._statsList = new StatsList(this._screen, clientApi, this._messageBox.messageBox())
    this._tubeList = new TubeList(this._screen, clientApi, this._statsList.statsList())
    this._menuBar = new MenuBar(this._screen, clientApi, this._statsList.statsList(), this._tubeList.tubeList())
    this._statsList.previous = this._tubeList.tubeList()
    this._messageBox.previous = this._statsList.statsList()
  }

  render () {
    this._screen.render()
  }

}

module.exports.BeanstalkScreen = BeanstalkScreen

