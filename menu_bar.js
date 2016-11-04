'use strict'

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
        let hdr = [ [ 'Attribute', 'Value' ] ]
        let arr = [
          [ 'current_jobs_ready', '' + data['current_jobs_ready'] ],
          [ 'current_jobs_urgent', '' + data['current_jobs_urgent'] ],
          [ 'current_jobs_reserved', '' + data['current_jobs_reserved'] ],
          [ 'current_jobs_delayed', '' + data['current_jobs_delayed'] ],
          [ 'current_jobs_buried', '' + data['current_jobs_buried'] ],
          [ 'job_timeouts', '' + data['job_timeouts'] ],
          [ 'current_tubes', '' + data['current_tubes'] ],
          [ 'current_connections', '' + data['current_connections'] ],
          [ 'current_workers', '' + data['current_workers'] ],
          [ 'current_waiting', '' + data['current_waiting'] ],
          [ 'total_jobs', '' + data['total_jobs'] ]
        ]
        this._statsList.setData(hdr.concat(arr))
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
