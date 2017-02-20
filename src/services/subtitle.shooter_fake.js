export var name = '射手网 (伪)'

export function search (name, noMuxer) {
  let token = window.app.config.subtitleServices.shooterFake.token

  let url = `https://api.assrt.net/v1/sub/search?token=${token}&q=${name}&cnt=10`
  if (noMuxer) url += '&no_muxer=1'
  return window.fetch(url)

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
  return window.fetch(`https://api.assrt.net/v1/sub/detail?token=${token}&id=${id}`)
  .then(res => res.json())
  .then(res => {
    return res.sub.subs[0] || {}
  })
}

export function searchLink (name) {
  return `https://assrt.net/sub/?searchword=${name}`
}
