const fs = require('fs')
const path = require('path')

const getFileContent = (file)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(file, (err,data)=>{
      if(err) {
        return reject(err)
      }
      resolve(JSON.parse(data.toString()))
    })
  })
}

module.exports = {
  getFileContent
}