import * as config from '../config.json'

export var name = '射手网 (伪)'

export function search (name) {
  return window.fetch(`http://api.assrt.net/v1/sub/search?token=${config.shooterFake.token}&q=${name}&cnt=5`)
  .then(res => res.json())
  .then(res => {
    if (res.sub.subs.length) return res.sub.subs
    else return []
  })
  .then(subs => {
    subs.forEach(sub => {
      sub.filelist = []
    })
    return subs
  })
}

export function detail (id) {
  return window.fetch(`http://api.assrt.net/v1/sub/detail?token=${config.shooterFake.token}&id=${id}`)
  .then(res => res.json())
  .then(res => {
    return res.sub.subs[0] || {}
  })
}

export function searchLink (name) {
  return `http://assrt.net/sub/?searchword=${name}`
}
