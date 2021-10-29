// axios URL
const url = 'http://192.168.0.192' // http://henrypt.vicp.cc  localhost:3000
const api = '/api'

let root
// 这里很重要，必须是production，
// 其实此时的process.env.NODE_ENV是undefined

if (process.env.NODE_ENV === 'development') {
  // development production
  root = api
} else {
  root = url
}

exports.PROXYROOT = url
exports.ROOT = root
exports.api = api
