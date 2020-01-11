const Sequelize = require('sequelize')

const seq = new Sequelize('koa2_weibo','root','12345678',{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = seq