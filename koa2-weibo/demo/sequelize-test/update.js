const {User,Blog} = require('./model')

!(async function(){

  const updateRes = await User.update({nickName: 'poetry11112'},{
    where: {
      userName: 'poetry1'
    }
  })
  console.log(updateRes[0]>0?'修改成功':'修改失败')
})()