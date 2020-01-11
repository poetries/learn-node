const {User,Blog} = require('./model')

!(async function(){
  // 查询一条记录
  const user1 = await User.findOne({
    where: {
      userName: 'poetry1'
    }
  })
  // 查询特定的列
  const user2 = await User.findOne({
    attributes: ['userName','nickName'],
    where: {
      userName: 'poetry1'
    }
  })
  //查询一个列表
  const blog1 = await Blog.findOne({
    where: {
      userId: 1
    }
  })
  
  // 查询总数
  const blog2 = await Blog.findAndCountAll({
    limit: 2,// 限制查询多少条
    offset: 2,// 跳过多少条
    order: [
      ['id','desc']
    ]
  })

  // console.log(blog.rows.map(v=>v.dataValues))

  // // 连表查询1
  // const blogWithUser = await Blog.findAndCountAll({
  //   limit: 2,// 限制查询多少条
  //   offset: 2,// 跳过多少条
  //   order: [
  //     ['id','desc']
  //   ],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['userName','nickName'],
  //     }
  //   ]
  // })
  // console.log(blogWithUser.rows.map(v=>{
  //   let b = v.dataValues
  //   b.user = b.user.dataValues
  //   return b 
  // }))

  // 连表查询2
  const blogWithUser2 = await User.findAndCountAll({
    attributes: ['userName','nickName'],
    limit: 2,// 限制查询多少条
    offset: 2,// 跳过多少条
    order: [
      ['id','desc']
    ],
    include: [
      {
        model: Blog
      }
    ]
  })

  console.log(
    blogWithUser2.rows.map(user=>{
      let userVal = user.dataValues
      userVal.blogs = userVal.blogs.map(v=>v.dataValues)

      return userVal
    })
  )

})()