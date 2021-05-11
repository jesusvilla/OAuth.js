const TEMPLATE = '0123456789ABCDEF'

module.exports.generateRandom = (len) => {
  let output = ''

  for (let i = 0; i < len; i++) {
    output += TEMPLATE[Math.floor(Math.random() * TEMPLATE.length)]
  }

  return output
  // return require('crypto').randomBytes(10).toString('hex')
}
