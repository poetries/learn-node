const express = require('express');
const router = express.Router();
const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../module/resModule')

router.post('/login',async function(req, res, next) {
  const {username,password} = req.body 
    let data = await login(username,password)
    data = data[0] || {}

    if(data.username) {
      req.session.username = data.username
      req.session.realname = data.realname

      console.log(req.session,'session')
      res.json(new SuccessModel({data},'登录成功'))
    }else {
      res.json(new ErrorModel('登录失败'))
    }
});

// router.get('/login-test',(req,res,next)=>{
//   if(req.session.username) {
//     return res.json({
//       errno:0,
//       msg: '已登录'
//     })
//   }
//   res.json({
//     errno:-1,
//     msg: '未登录'
//   })
// })
// router.get('/session-test',(req,res,next)=>{
//   const session = req.session;
//   console.log(session,'session')
//   if(session.viewNum == null) {
//     session.viewNum = 0
//   }
//   session.viewNum++

//   res.json({viewNum:session.viewNum})
// })

module.exports = router;
