const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

class UserController {
    /**
     * 注册
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async register(ctx) {
        const req = ctx.request.body;
        if (req.username && req.password) {
            const result = await UserModel.checkUser({
                username: req.username,
                password: req.password
            });

            if (result !== null) {
                return (ctx.body = {
                    code: -1,
                    msg: '该用户名已存在',
                    checkUser
                });
            } else {
                const user = await UserModel.createUser(req);
                if (user) {
                    ctx.body = {
                        code: 0,
                        msg: '注册成功',
                        data: {
                            user_id: user.id
                        }
                    };
                } else {
                    ctx.body = {
                        code: -1,
                        msg: '注册失败'
                    };
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '参数不全'
            };
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {
        const req = ctx.request.body;
        if (req.username && req.password) {
            const result = await UserModel.findUser(req);
            // findOne 查询空时为null
            if (result !== null) {
                const payload = {
                    user_id: result.id,
                    username: result.username
                };

                const token = getToken(payload);

                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    token
                };
            } else {
                ctx.body = {
                    code: -1,
                    msg: '用户名或密码错误'
                };
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '参数不合法'
            };
        }
    }

    /**
     * 获取用户信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getUserInfo(ctx) {
        // 1.可以直接用过ctx.state.user获取payload中的user_id
        // 2.前端访问时会附带token在请求头
        // const payload = getJWTPayload(ctx.headers.authorization)

        const user = ctx.state.user;

        if (user.user_id) {
            const result = await UserModel.userInfo(user.user_id);
            if (result) {
                ctx.body = {
                    code: 0,
                    msg: '查询成功',
                    data: result
                };
            } else {
                ctx.body = {
                    code: -1,
                    msg: '查询失败'
                };
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '缺少user_id'
            };
        }
    }

    /**
     * 更新用户头像
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateUserAvatar(ctx) {
        const user_id = ctx.state.user.user_id;
        const req = ctx.request.body;
        if (req.headimgurl) {
            const result = await UserModel.updateUserAvatar(
                req.headimgurl,
                user_id
            );
            if (result) {
                ctx.body = {
                    code: 0,
                    msg: '用户头像保存成功',
                    data: {
                        result
                    }
                };
            } else {
                ctx.body = {
                    code: -1,
                    msg: '用户头像保存失败'
                };
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '缺少参数'
            };
        }
    }
}

/* 获取一个期限为1小时的token */
function getToken(payload = {}) {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });
}

/* 通过headers的token获取JWT的payload部分 */
function getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], config.jwt.secret);
}

module.exports = UserController;
