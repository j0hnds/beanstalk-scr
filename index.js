#!/usr/bin/env node

'use strict'
const blessed = require('blessed')
const clientApi = require('./client_api')

// Create a screen object
const screen = blessed.screen({ smartCSR: true })

screen.title = 'Beanstalk API'

const menu = blessed.listbar({
  parent: screen,
  mouse: true,
  keys: true,
  commands: {
    Invoke: {
      keys: [ 'i' ],
      callback: () => { 
        clientApi.get('', {}).
          then((data) => {
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
              [ 'total_jobs', '' + data['total_jobs'] ],
            ]
            //let arr = Object.keys(data).map((currentValue, index, arr) => { 
              //return [ currentValue, 
                //'' + data[currentValue] ] 
            //})
            results.setData(hdr.concat(arr))
            tubeList.setData([])
            screen.render()
          })
      }
    },
    Tubes: {
      keys: [ 't' ],
      callback: () => {
        clientApi.get('/tubes', {}).
          then((data) => {
            let hdr = [ [ 'Tubes' ] ]
            let arr = data.map((currentValue, index, arr) => {
              return [ currentValue ]
            })
            tubeList.setData(hdr.concat(arr))
            tubeList.focus()
            screen.render()
          })
      }
    },
    Exit: {
      keys: [ 'q', 'escape' ],
      callback: () => { process.exit(0) }
    }
  }
})

const tubeList = blessed.listtable({
  parent: screen,
  mouse: true,
  top: 2,
  left: 0,
  height: '100%',
  align: 'left',
  interactive: true,
  keys: [ 'up', 'down' ],
  style: {
    cell: {
      selected: {
        inverse: true
      },
      hover: {
        bg: 'green'
      },
    },
    header: {
      bold: true
    },
    scrollbar: {
      bg: 'red',
      fg: 'blue'
    }
  },
})

function urlTubeName(tubeName) {
  return new Buffer(tubeName).toString('base64')
}

tubeList.on('select', (data, index) => { 
  clientApi.get('/tubes/' + urlTubeName(data.content.trim()), {}).
    then((data) => {
      // console.log("Data: %j", data)
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
      //let arr = Object.keys(data).map((currentValue, index, arr) => { 
        //return [ currentValue, 
          //'' + data[currentValue] ] 
      //})
      results.setData(hdr.concat(arr))
      screen.render()
    })
})

const results = blessed.listtable({
// const results = blessed.listtable({
  parent: screen,
  mouse: true,
  top: 2,
  left: 20,
  height: '100%',
  align: 'right',
  vi: true,
  style: {
    header: {
      bold: true
    },
    scrollbar: {
      bg: 'red',
      fg: 'blue'
    }
  },
  //rows: [
    //[ 'Attribute', 'Value' ]
  //]
})

screen.render()
//clientApi.get({})
  //.then((data) => console.log("Data: %j", data))
