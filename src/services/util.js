export function getFileName (path) {
  return path.replace(/^.*[\\\/]/, '')
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
