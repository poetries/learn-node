const {User,Blog} = require('./model')

!(async function(){

  // const blog = await Blog.destroy({
  //   where: {
  //     id: 1
  //   }
  // })
  // console.log(blog>0?'删除成功':'删除失败')

  // 删除改用户 用户下所有的微博也将删除
  const user = await User.destroy({
    where: {
      id: 1
    }
  })
  console.log(user>0?'删除成功':'删除失败')
})()