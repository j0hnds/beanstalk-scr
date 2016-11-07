'use strict'

class TubeList {
  constructor (screen, clientApi, statsList) {
    this._screen = screen
    this._clientApi = clientApi
    this._statsList = statsList
  }

  select (data, index) {
    this._clientApi.get('/tubes/' + this._clientApi.urlTubeName(data.content.trim()), {})
      .then((data) => {
        let hdr = [ [ 'Attribute', 'Value' ] ]
        let arr = [
          [ 'current_jobs_ready', '' + data['current_jobs_ready'] ],
          [ 'current_jobs_urgent', '' + data['current_jobs_urgent'] ],
          [ 'current_jobs_reserved', '' + data['current_jobs_reserved'] ],
          [ 'current_jobs_delayed', '' + data['current_jobs_delayed'] ],
          [ 'current_jobs_buried', '' + data['current_jobs_buried'] ],
          [ 'current_waiting', '' + data['current_waiting'] ],
          [ 'total_jobs', '' + data['total_jobs'] ]
        ]
        this._statsList.setData(hdr.concat(arr))
        this._screen.render()
      })
  }
}

module.exports.TubeList = TubeList
