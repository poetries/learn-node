// 连接redis

const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error',err=>{
  console.error(err)
})

/**
 *redis set
 * @param {string} key
 * @param {string} val
 * @param {number} [timeout=60*60] 过期时间 单位s
 */
function set(key,val,timeout=60*60) {
  if(typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 *redis get
 *
 * @param {string} key
 */
function get(key) {
  return new Promise((resolve,reject)=>{
    redisClient.get(key,(err,val)=>{
      if(err) {
        return reject(err)
      }
      if(val == null) {
        return resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  get,
  set
}