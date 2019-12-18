const http = require('http')

// 组合中间件
// next机制实现
function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i]
      try {
        // Promise.resolve保证所有中间件返回都是Promise
        return Promise.resolve(fn(ctx,dispatch.bind(null,i+1))) // 取出下一个中间件执行
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return dispatch(0)
  }
}

/**
 * koa2中间件原理
 * 不涉及到路由层面
 */
class LikeKoa2 {
  constructor(){
    this.middlewareList = [] 
  }
  // 注册中间件
  use(fn) {
    this.middlewareList.push(fn)
    return this
  }
  createContext(req,res){
    const ctx = {
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }
  handleRequest(ctx,fn) {
    return fn(ctx)
  }
  callback(){
    const fn = compose(this.middlewareList)
    return (req,res)=>{
      const ctx = this.createContext(req,res)
      return this.handleRequest(ctx,fn)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args) // 透传参数
  }
}

module.exports = LikeKoa2