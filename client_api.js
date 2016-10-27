'use strict'

const Client = require('node-rest-client').Client

const client = new Client()

const headers = {
  Authorization: 'Token token="' + process.env.API_TOKEN + '"'
}

class ClientAPI {
  constructor (server, port, token, nonencrypted) {
    this._server = server
    this._port = port
    this._token = token
    this._nonencrypted = nonencrypted
  }

  _buildUrl (uri) {
    let url = (this._nonencrypted) ? 'http://' : 'https://'

    url += this._server

    if (this._port) url += `:${this._port}`

    url += '/beanstalk'

    return url + uri
  }

  get (uri, args) {
    return new Promise((resolve, reject) => {
      client.get(this._buildUrl(uri), { data: args, headers: headers }, (data, response) => {
        resolve(data)
      })
    })
  }

}

module.exports.ClientAPI = ClientAPI
