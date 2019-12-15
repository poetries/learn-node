// 逐行读取分析日志文件

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../','../','logs', 'access.log')

// 创建read Stream
const readStream = fs.createReadStream(fileName)

// 创建read write
const readWrite = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
readWrite.on('line',(lineData)=>{
  if(!lineData) return;
  sum++; // 记录总行数

  const arr = lineData.split(' -- ')
  if(arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
})

//监听读取完成
readWrite.on('close',()=>{
  console.log('chrome 占比 ',chromeNum/sum)
})