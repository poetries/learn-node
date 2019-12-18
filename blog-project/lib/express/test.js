const express = require('./like-express')

const app = express()

app.use((req,res,next)=>{
  console.log('请求开始',req.method,req.url)
  next()
})

app.use((req,res,next)=>{
  // 假设处理cookie
  console.log('处理cookie')
  req.cookie = {
    userId: '123'
  }
  next()
})

app.use('/api',(req,res,next)=>{
  console.log('处理api路由')
  next()
})
// 模拟登陆
function loginCheck(req,res,next){
  setTimeout(() => {
    console.log('模拟登陆ok')
    next()
  });
}
app.get('/api/get-cookie',loginCheck,(req,res,next)=>{
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.listen(9000,()=>{
  console.log('listen 9000')
})