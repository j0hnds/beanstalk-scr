'use strict'

const Client = require('node-rest-client').Client

const client = new Client()

class ClientAPI {

  constructor (server, port, token, nonencrypted) {
    this._server = server
    this._port = port
    this._nonencrypted = nonencrypted
    this._headers = { Authorization: `Bearer ${token}` }
  }

  _buildUrl (uri) {
    let url = (this._nonencrypted) ? 'http://' : 'https://'

    url += this._server

    if (this._port) url += `:${this._port}`

    url += '/queue'

    return url + uri
  }

  get (uri, args) {
    return new Promise((resolve, reject) => {
      client.get(this._buildUrl(uri), { data: args, headers: this._headers }, (data, response) => {
        if (response.statusCode === 200) {
          resolve(data)
        } else {
          reject(data)
        }
      })
    })
  }

  delete (uri, args) {
    return new Promise((resolve, reject) => {
      client.delete(this._buildUrl(uri), { data: args, headers: this._headers }, (data, response) => {
        if (response.statusCode === 200) {
          resolve(data)
        } else {
          reject(data)
        }
      })
    })
  }

  urlTubeName (tubeName) {
    return new Buffer(tubeName).toString('base64')
  }

}

module.exports.ClientAPI = ClientAPI
