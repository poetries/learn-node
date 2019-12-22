const config = {
    environment: 'dev',
    port: process.env.PORT || 3000, // 端口号
    database: {
        dbName: 'shop',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678'
    },
    security: {
        secretKey: 'yangpengcheng19950215',
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        AppID: 'wxe449e3e5bc2c04bc',
        AppSecret: 'ddef37953dff61557f41eb026509c264',
        loginUrl: `https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code`
    },
    oss: {
    },
    host: 'http://localhost:3000/'
}

module.exports = config
