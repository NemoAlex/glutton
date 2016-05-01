import { map, isArray } from 'lodash'

export function call (server, name, params = []) {
  if (server.secret) params.unshift(`token:${server.secret}`)
  var uri = `http${server.ssl ? 's' : ''}://${server.host}:${server.port}/${server.extension}`
  return window.fetch(uri, {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': name,
      'params': params || []
    })
  })
  .catch(function () {
    throw new Error('Can not connect to the server.')
  })
  .then(res => res.json())
  .then(function (res) {
    if (res.error) throw new Error(res.error.message)
    return res
  })
  .then(res => res.result)
}

export function multicall (server, calls) {
  if (!isArray(calls)) calls = map(calls, (value, key) => ({ methodName: key, params: value || [] }))
  if (server.secret) {
    calls.forEach(function (call) {
      call.params.unshift(`token:${server.secret}`)
    })
  }
  var uri = `http${server.ssl ? 's' : ''}://${server.host}:${server.port}/${server.extension}`
  return window.fetch(uri, {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': 'system.multicall',
      'params': [calls]
    })
  })
  .catch(function () {
    throw new Error('Can not connect to the server.')
  })
  .then(res => res.json())
  .then(res => res.result.map(value => {
    if (value.code) throw new Error(value.message)
    return value[0]
  }))
  .then(function (results) {
    return results
  })
}
