import { map } from 'lodash'

export function call (name, params) {
  return fetch('http://127.0.0.1:6800/jsonrpc', {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': name,
      'params': params || []
    })
  })
  .then(function (res) {
    return res.json()
  })
  .then(function (res) {
    return res.result
  })
}

export function multicall (calls) {
  calls = map(calls, function (value, key) {
    return {
      methodName: key,
      params: value || []
    }
  })
  return fetch('http://127.0.0.1:6800/jsonrpc', {
    method: 'post',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 'Glutton',
      'method': 'system.multicall',
      'params': [calls]
    })
  })
  .then(function (res) {
    return res.json()
  })
  .then(function (res) {
    return res.result.map(function (value) { return value[0] })
  })
}
