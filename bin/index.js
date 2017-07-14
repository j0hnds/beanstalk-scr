#!/usr/bin/env node

'use strict'

const program = require('commander')
const ClientAPI = require('../lib/client_api').ClientAPI
const BeanstalkScreen = require('../lib/beanstalk_screen').BeanstalkScreen

program
  .version('1.0.0')
  .option('-s,--server [server]',
          `Server for beanstalk_api [${process.env.VAULT_API_SERVER}]`,
          process.env.VAULT_API_SERVER)
  .option('-p,--port [port]',
          `Server port for beanstalk_api [${process.env.VAULT_API_PORT}]`,
         process.env.VAULT_API_PORT)
  .option('-t,--token [token]',
          `API token [${process.env.VAULT_API_KEY}]`,
          process.env.VAULT_API_KEY)
  .option('-n,--nonencrypted',
          'Toggles encrypted request',
          false)
  .parse(process.argv)

const clientApi = new ClientAPI(program.server,
                                program.port,
                                program.token,
                                program.nonencrypted)

const screen = new BeanstalkScreen(clientApi)

screen.render()
