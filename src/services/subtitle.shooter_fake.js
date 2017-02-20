export var name = '射手网 (伪)'

export function search (name) {
  let token = window.app.config.subtitleServices.shooterFake.token
  return window.fetch(`http://api.assrt.net/v1/sub/search?token=${token}&q=${name}&cnt=10&no_muxer=1`)
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
  let token = window.app.config.subtitleServices.shooterFake.token
  return window.fetch(`http://api.assrt.net/v1/sub/detail?token=${token}&id=${id}`)
  .then(res => res.json())
  .then(res => {
    return res.sub.subs[0] || {}
  })
}

export function searchLink (name) {
  return `http://assrt.net/sub/?searchword=${name}`
}
