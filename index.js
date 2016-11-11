#!/usr/bin/env node

'use strict'

const ClientAPI = require('./client_api').ClientAPI
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

const clientApi = new ClientAPI(program.server,
                                program.port,
                                program.token,
                                program.nonencrypted)

const screen = new BeanstalkScreen(clientApi)

screen.render()
