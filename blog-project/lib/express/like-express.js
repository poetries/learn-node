const http = require('http')
const slice = Array.prototype.slice 

/**
 * 例子
 * app.use 
 * app.listen
 * app.post 
 * app.get
 */
// 中间件原理
class LikeExpress {
  constructor(){
    // 存放中间件列表
    this.routes = {
      all: [], // app.use注册的函数
      get: [], // app.get方式注册的
      post: [], // app.post
      delete: []
    }
  }
  /**
   * 
   * @param 
   * 中间件第一个参数有些是path、func
   * app.use(function(){})
   * app.get('api/getlist)
   * app.post('api/login)
   */
  register(path) {
    const info = {} // 当前注册信息
    if(typeof path == 'string') {
      // 如app.get('api/getlist)
      info.path = path

      // 取出数组的信息从第二项开始，转化为数组
      // 如 app.get('/',func1,func2)
      info.stack = slice.call(arguments,1)
    }else {
      // 如 app.use('/',function(){})
      info.path = '/'
      // 如 app.use(func1,func2)
      info.stack = slice.call(arguments,0)
    }
    return info
  }
  // === 中间件注册使用方式 ====
  use() {
    // 把当前函数所有的参数存入
    const info = this.register.apply(this,arguments)
    this.routes.all.push(info)
  }
  get() {
    const info = this.register.apply(this,arguments)
    this.routes.get.push(info)
  }
  post() {
    const info = this.register.apply(this,arguments)
    this.routes.post.push(info)
  }
  delete() {
    const info = this.register.apply(this,arguments)
    this.routes.delete.push(info)
  }
  match(method,url) {
    let stack = []
    if(url === '/favicon.ico') {
      // 浏览器默认带的一个请求
      return stack
    }
    // 获取routes 。汇集get post use 注册的
    let currRoutes = []
    currRoutes = currRoutes.concat(this.routes.all)
    currRoutes = currRoutes.concat(this.routes[method])

    currRoutes.forEach(routeInfo=>{
      // url == 'api/login' 并且 outeInfo.path == ‘/’
      // url == 'api/login' 并且 outeInfo.path == ‘/api/’
      // url == 'api/login' 并且 outeInfo.path == ‘/api/list’
      if(url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }
  // 使用方式
  // app.use((req,res,next)=>res.json({}))
  callback() {
    return (req,res)=>{
      // 自己定义一下res.json 
      res.json = (data)=>{
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url 
      const method = req.method.toLowerCase()

      // 注册的中间件哪些需要访问 哪些不需要
      const resultList = this.match(method,url)
      this.handle(req,res,resultList)
    }
  }
  /**
   * 核心next机制
   * @param {*} req 
   * @param {*} res 
   * @param {*} stack 
   * 用法 app.get('api',(req,res,next)=>next())
   */

   // app.use((req,res,next)=>next()) A
   // app.use((req,res,next)=>next()) B
   // app.use((req,res,next)=>next()) C
   // 第一次进来先执行A 然后当调用next()的时候会再次执行next 到了B
  handle(req,res,stack){
    const next = ()=>{
      // 拿到第一个匹配的中间件
      const middleware = stack.shift() // stack是一个函数列表 每次执行都取第一个
      if(middleware) {
        // 执行中间件函数
        middleware(req,res,next)
      }
    }
    next() // 第一次先执行
  }
  // 使用方式 app.listen(300,()=>console.log())
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args) // 透传参数
  }
}

module.exports = ()=>{
  return new LikeExpress()
}