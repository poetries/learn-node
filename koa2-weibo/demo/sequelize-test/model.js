const Sequelize = require('sequelize')
const seq = require('./seq')

/**
 * 创建表结构
 */

// 创建User模型
// 最后创建的表都是复数形式 如users表
const User = seq.define('user',{
  // id会自动创建和设置为主键
  userName: {
    type: Sequelize.STRING, // varchar(255)默认
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING
  },
  // 自动创建 createAt、updateAt
})

// 创建blog模型
const Blog = seq.define('blog',{
  // id会自动创建和设置为主键
  title: {
    type: Sequelize.STRING, // varchar(255)默认
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键关联
// 写法一
// blog属于user 多对一关系 -- 两种都写 连表查询需要
Blog.belongsTo(User, {
  // 创建外键 Blog.useId =>User.id
  foreignKey: 'userId'
})

// 不推荐写法 注释Blog中的useId 会自动创建关联
// Blog.belongsTo(User)

// 写法二 一对多 -- 两种都写 连表查询需要
User.hasMany(Blog, {
  // 创建外键 Blog.useId =>User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}