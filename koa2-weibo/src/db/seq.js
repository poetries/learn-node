const Sequelize = require('sequelize')
const {MYSQL_CONF:{host,user,password,database}} = require('../conf/db')
const {isEnv,isProd,isTest} = require('../utils/env')

const conf = {
  host,
  dialect: 'mysql'
}
if(isTest) {
  conf.logging = ()=>{}
}
// 线上环境 使用连接池
if(isProd) {
  conf.pool = {
    max: 5,// 连接池中最大的连接数量
    min: 0,// 最小
    idle: 10000 // 如果一个连接池10s之内没有被使用，则释放
  }
}

const seq = new Sequelize(database,user,password,conf)

module.exports = seq