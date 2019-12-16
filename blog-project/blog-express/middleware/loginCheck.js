const {SuccessModel,ErrorModel} = require('../module/resModule')

module.exports = (req,res,next)=>{
  if(req.session.username) {
    // 已经登录
    return next()
  }
  res.json(new ErrorModel('未登录'))
}