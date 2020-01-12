// 同步数据结构 将会清空数据

const seq = require('./seq')

// require('./model')

// 测试连接
seq.authenticate().then(()=>{
  console.log('连接数据库成功')
}).catch(()=>console.log('连接出错了'))

// 执行同步
seq.sync({force: true}).then(()=>{
  console.log('sync ok')
  process.exit()
})