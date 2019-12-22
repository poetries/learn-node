const {SuccessModel,ErrorModel} = require('../module/resModule')

module.exports = async (ctx,next)=>{
  if(ctx.session.username) {
    // 已经登录
    await next()
    return 
  }
  ctx.body = new ErrorModel('未登录')
}