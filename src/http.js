const fetch = require('node-fetch')
const qs = require('querystring')

async function httpClient ({ url, method = 'GET', headers = {}, qs = {}, body }) {
  const endpoint = url + '?' + httpClient.encode(qs)
  Object.assign(headers, {
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  const config = {
    method,
    headers
  }

  if (body != null) {
    config.body = httpClient.encode(body)
  }

  const response = await fetch(endpoint, config)
  const res = await response.json()

  if (!/^[23]\d{2}$/.test(response.status)) {
    return Promise.reject(res)
  }

  return res
}

httpClient.encode = (params) => qs.encode(params)

module.exports = httpClient
