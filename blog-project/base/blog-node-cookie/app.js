const querystring = require('querystring')

const handleUserRouter = require('./src/router/blog')
const handleBlogRouter = require('./src/router/user')

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

  req.body = await getPostData(req)
  // 路由处理
  const blogData = await handleBlogRouter(req,res)
  if(blogData) {
    return res.end(JSON.stringify(blogData))
  }

  const userData = await handleUserRouter(req,res)
  if(userData) {
    return res.end(JSON.stringify(userData))
  }

  // 处理404
  res.writeHeader(404, {'Content-type': 'text/plain'})
  res.write('404 Not Find')
  res.end()
}

module.exports = serverHandle