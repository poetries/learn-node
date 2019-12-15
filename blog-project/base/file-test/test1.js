const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName,(err,data)=>{
//   if(err){
//     console.error(err)
//   }
//   // data是二进制文件，需要转为字符串
//   console.log(data.toString())
// })

// 写文件
// const content = '测试内容\n'
// const opt = {
//   flag: 'a' // 追加写入 覆盖 写入是’w‘
// }
// fs.writeFile(fileName,content,opt,(err)=>{
//   if(err){
//     console.error(err)
//   }
// })

// 判断文件是否存储
// fs.exists(fileName,(exist)=>{
//   console.log(exist) // true
// })