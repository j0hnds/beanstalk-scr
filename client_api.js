'use strict'

const Client = require('node-rest-client').Client

const client = new Client();

const url = 'https://www.abaqis.com/beanstalk'

const headers = {
  Authorization: 'Token token="' + process.env.API_TOKEN + '"'
}

const get = (uri, args) => {
  return new Promise((resolve, reject) => {
    client.get(url + uri, { data: args, headers: headers }, (data, response) => {
      resolve(data)
    })
  })
}

module.exports = {
  get: get
}
