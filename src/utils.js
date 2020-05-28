module.exports.generateRandom = (len) => {
  const hex = '0123456789ABCDEF'
  let output = ''
  for (let i = 0; i < len; ++i) {
    output += hex[Math.floor(Math.random() * hex.length)]
  }
  return output
  // return require('crypto').randomBytes(10).toString('hex')
}
