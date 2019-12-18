const {exec} = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) =>{
  // 1=1 这里永远成立 ， 放这里占一个位置
  let sql = `select * from blogs where 1=1 ` 
  console.log(author,'author')
  if(author) {
    sql += `and author='${author}' ` // 注意后面空格的地方
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc`

  return exec(sql)
}

const getDetail = async id=>{
  let sql = `select * from blogs where id='${id}'`
  return exec(sql)
}

const newBlog = async (blogData={})=>{
  //blogData博客对象 包含title content author
  console.log(blogData,'blogData')
  let {title,content,author} = blogData
  const createTime = Date.now()

  // 预防xss攻击
  title = xss(title)
  content = xss(content)

  const sql = `
    insert into blogs (title, content, author,createTime) values('${title}','${content}','${author}',${createTime});
  `
  return exec(sql)
}

const updateBlog = async (id,blogData={})=>{
  console.log(blogData)
  const {title,content,url=''} = blogData
  let sql = `
    update blogs set title='${title}',content='${content}',url='${url}' where id=${id}
  `
  return exec(sql)
}

const delBlog = async (id,author)=>{
  console.log(author,'author')
  let sql = `
    delete from blogs where id=${id} and author='${author}'
  `
  return exec(sql)
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} 