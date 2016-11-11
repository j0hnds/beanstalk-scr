#!/usr/bin/env node

'use strict'
// const blessed = require('blessed')
const ClientAPI = require('./client_api').ClientAPI
const MenuBar = require('./menu_bar').MenuBar
const TubeList = require('./tube_list').TubeList
const StatsList = require('./stats_list').StatsList
const program = require('commander')
const BeanstalkScreen = require('./beanstalk_screen').BeanstalkScreen

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
const screen = new BeanstalkScreen(clientApi)

const statsList = new StatsList(screen.screen())

const tubeList = new TubeList(screen.screen(), clientApi, statsList.statsList())
new MenuBar(screen.screen(), clientApi, statsList.statsList(), tubeList.tubeList())

screen.render()
