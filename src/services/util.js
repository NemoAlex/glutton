import * as defaultConfig from '../config.json'
import * as _ from 'lodash'

export function getEntryFileName (listEntry) {
  let name = ''
  if (listEntry.bittorrent) name = listEntry.bittorrent.info.name
  else name = listEntry.files[0].path.replace(/^.*[\\\/]/, '')
  if (!name) name = listEntry.files[0].uris[0].uri
  return name || '...'
}

export function getFilePath (path) {
  return path.match(/^.*[\\\/]/)[0]
}

export function bytesToSize (bytes, keepDigits) {
  bytes = Number(bytes)
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 KB'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10)
  if (i === 0) return bytes + ' ' + sizes[i]
  var k = [1, 1, 10, 100, 100][i]
  if (Number.isInteger(keepDigits)) k = Math.pow(10, keepDigits)
  return `${Math.floor(bytes / Math.pow(1024, i) * k) / k} ${sizes[i]}`
}

export function addZeros (num, length, zero = '0') {
  var str = String(num)
  return new Array(length - str.length + 1).join(zero) + str
}

export function findDiff (names) {
  let name = names[0]
  let common = ''
  for (var i = 0; i < name.length; i++) {
    let test = `${common}${name[i]}`
    let success = true
    for (let t = 0; t < names.length; t++) {
      if (names[t].indexOf(test) !== 0) {
        success = false
        break
      }
    }
    if (!success) break
    common = test
  }
  return {
    common,
    diff: names.map(n => n.substr(common.length))
  }
}

export function generateGid (i = 0) {
  return addZeros(Date.now().toString(16), 14, 'f') + addZeros(i.toString(16), 2)
}

export function getQueryParam (param) {
  param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + param + '=([^&#]*)')
  var results = regex.exec(window.location.href)
  if (!results) return null
  else return window.decodeURIComponent(results[1])
}

export function parseServerString (s) {
  /* eslint-disable no-unused-vars */
  var [address, secret] = s.split('||')
  var [url, ssl, host, port, extension] = address.match(/(\w+):\/\/([^:|\/]+)(:\d*)?(.*)/i)
  ssl = ssl === 'https'
  port = port ? port.replace(':', '') : null
  extension = extension.replace('/', '')
  var server = { ssl, host, port, extension, secret }
  server = _.omitBy(server, val => !val && val !== false)
  return Object.assign({}, defaultConfig.defaultServer, server)
}
