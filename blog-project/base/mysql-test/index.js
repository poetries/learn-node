const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'myblog' //使用创建的数据库
})

// 开始连接
con.connect(()=>{
  console.log('连接成功')
})

// 执行sql语句
const users = 'select * from users;'
const blogs = 'select * from blogs;'
const insertBlog = `insert into blogs(title, content,createTime, author,url) values('测试2', '测试2', 1576295867197,'poetry','http://blog.poetries.top');
`

// con.query(`update users set realname='小红' where username='poetry'`,(err,result)=>{
//   if(err){
//     console.error(err)
//     return
//   }
//   console.log(result)
// })
// con.query(insertBlog,(err,result)=>{
//   if(err){
//     console.error(err)
//     return
//   }
//   console.log(result)
// })

// con.query(`delete from blogs where id='12'`,(err,result)=>{
//   if(err){
//     console.error(err)
//     return
//   }
//   console.log(result)
// })

con.query(blogs,(err,result)=>{
  if(err){
    console.error(err)
    return
  }
  console.log(result)
})

// 关闭连接
con.end()