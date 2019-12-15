const querystring = require('querystring')

const handleUserRouter = require('./src/router/blog')
const handleBlogRouter = require('./src/router/user')

// 获取cookir过期时间
const getCookirExpires = ()=>{
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))

  // cookie 要设置GMT过期时间
  return d.toGMTString()
}

// session数据
const SESSION_DATA = {}

// 处理post data
const getPostData = req=>{
  return new Promise((resolve,reject)=>{
    if(req.method !== 'POST' || req.headers['content-type'] != 'application/json') {
      return resolve({})
    }

    let postData = ''
    req.on('data',chunk=>{
      postData +=chunk.toString()
    })
    req.on('end',()=>{
      if(!postData) {
        return resolve({})
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = async (req,res)=>{
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  // 处理query
  req.query = querystring.parse(url.split('?')[1])

  // 处理cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1;k2=k2
  cookieStr.split(';').forEach(v=>{
    if(!v) return
    const arr = v.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  console.log(req.cookie,'cookie')

  // 解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if(userId) {
    if(!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  }else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }

  req.session = SESSION_DATA[userId]
  console.log(SESSION_DATA,'SESSION_DATA')
  console.log(req.session,'req.session')

  // 处理postData
  req.body = await getPostData(req)
  // 路由处理
  const blogData = await handleBlogRouter(req,res)
  if(blogData) {
    if(needSetCookie) {
      res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookirExpires()}`)
    }
    return res.end(JSON.stringify(blogData))
  }

  const userData = await handleUserRouter(req,res)
  if(userData) {
    if(needSetCookie) {
      res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookirExpires()}`)
    }
    return res.end(JSON.stringify(userData))
  }

  // 处理404
  res.writeHeader(404, {'Content-type': 'text/plain'})
  res.write('404 Not Find')
  res.end()
}

module.exports = serverHandle