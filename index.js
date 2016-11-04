#!/usr/bin/env node

'use strict'
const blessed = require('blessed')
const ClientAPI = require('./client_api').ClientAPI
const MenuBar = require('./menu_bar').MenuBar
const program = require('commander')

program
  .version('1.0.0')
  .option('-s,--server [server]',
          `Server for beanstalk_api [${process.env.API_SERVER}]`,
          process.env.API_SERVER)
  .option('-p,--port [port]',
          'Server port for beanstalk_api')
  .option('-t,--token [token]',
          `API token [${process.env.API_TOKEN}]`,
          process.env.API_TOKEN)
  .option('-n,-nonencrypted',
          'Toggles encrypted request',
          false)
  .parse(process.argv)

const clientApi = new ClientAPI(program.server, program.port, program.token, program.nonencrypted)

// Create a screen object
const screen = blessed.screen({ smartCSR: true })

screen.title = 'Beanstalk API'

const statsList = blessed.listtable({
  parent: screen,
  mouse: true,
  border: {
    type: 'line'
  },
  top: 2,
  left: 20,
  height: 14,
  align: 'right',
  vi: true,
  style: {
    header: {
      bold: true
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

const menuBar = new MenuBar(screen, clientApi, statsList, tubeList)

blessed.listbar({
  parent: screen,
  mouse: true,
  keys: true,
  top: 0,
  left: 0,
  height: 1,
  commands: {
    Invoke: {
      keys: [ 'i' ],
      callback: () => menuBar.invoke()
    },
    Tubes: {
      keys: [ 't' ],
      callback: () => menuBar.tubes() // {
    },
    Exit: {
      keys: [ 'q', 'escape' ],
      callback: () => menuBar.exit() // { process.exit(0) }
    }
  }
})

tubeList.on('select', (data, index) => {
  clientApi.get('/tubes/' + clientApi.urlTubeName(data.content.trim()), {})
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
      statsList.setData(hdr.concat(arr))
      screen.render()
    })
})

screen.render()
