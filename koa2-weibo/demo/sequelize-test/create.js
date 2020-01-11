// insert 语句

const {User,Blog} = require('./model')

!(async function(){
  for(let i=1;i<300;i++) {
    // 创建用户
    // insert into () values()
    const user = await User.create({
      userName: 'poetry' + i,
      password: 123456,
      nickName: 'poetry' + i
    })
    await Blog.create({
      title: '博客' + i,
      content: '博客' + i,
      userId: user.dataValues.id
    })
  }


})()