'use strict'

const TubeAttributes = require('./stats_config').TubeAttributes
const HeaderLabels = require('./stats_config').HeaderLabels

class TubeList {
  constructor (screen, clientApi, statsList) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = statsList
  }

  select (data, index) {
    this._clientApi.get('/tubes/' + this._clientApi.urlTubeName(data.content.trim()), {})
      .then((data) => {
        let arr = TubeAttributes.map((item) => {
          return [ item, '' + data[item] ]
        })
        this._statsList.setData(HeaderLabels.concat(arr))
        this._screen.render()
      })
  }
}

module.exports.TubeList = TubeList
