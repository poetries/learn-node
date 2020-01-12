const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production'
}