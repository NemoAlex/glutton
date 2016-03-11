import { map, isArray } from 'lodash'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function call (server, name, params = []) {
  if (server.secret) params.unshift(`token:${server.secret}`)
  var uri = `http${server.ssl ? 's' : ''}://${server.host}:${server.port}/jsonrpc`
  return fetch(uri, {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': name,
      'params': params || []
    })
  })
  .then(checkStatus)
  .then(res => res.json())
  .then(res => res.result)
}

export function multicall (server, calls) {
  if (!isArray(calls)) calls = map(calls, (value, key) => ({ methodName: key, params: value || [] }))
  if (server.secret) {
    calls = calls.forEach(function (call) {
      call.params = call.params.unshift(`token:${server.secret}`)
    })
  }
  var uri = `http${server.ssl ? 's' : ''}://${server.host}:${server.port}/jsonrpc`
  return fetch(uri, {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': 'system.multicall',
      'params': [calls]
    })
  })
  .then(checkStatus)
  .then(res => res.json())
  .then(res => res.result.map(value => value[0]))
}
