'use strict'

const blessed = require('blessed')
const TubeList = require('./tube_list').TubeList
const StatsList = require('./stats_list').StatsList
const MenuBar = require('./menu_bar').MenuBar

class BeanstalkScreen {
  constructor (clientApi) {
    this._screen = blessed.screen({ smartCSR: true })
    this._screen.title = 'Beanstalk API'
    this._statsList = new StatsList(this._screen)
    this._tubeList = new TubeList(this._screen, clientApi, this._statsList.statsList())
    this._menuBar = new MenuBar(this._screen, clientApi, this._statsList.statsList(), this._tubeList.tubeList())
  }

  render () {
    this._screen.render()
  }

  screen () { return this._screen }
}

module.exports.BeanstalkScreen = BeanstalkScreen

