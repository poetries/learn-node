const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

// 前后端分离 不用管
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// 这样可以在在req.body中拿到数据
app.use(express.json()); // content-type="application/json" 获取post data数据
app.use(express.urlencoded({ extended: false })); // post 数据兼容其他contentTye格式

// 可以req.cookie拿到cookie信息
app.use(cookieParser());

const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJLFJFS$@+',
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24*60*60*1000 // 24h
  },
  store: sessionStore
}))
// 静态文件 前后端分离 不用管
app.use(express.static(path.join(__dirname, 'public')));

// 父路径 拼接下面的子路径才是完整路径
app.use('/', indexRouter); 
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
