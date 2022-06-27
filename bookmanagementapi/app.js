var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');

const cors=require('cors');

const { response } = require("./app");
const http=require("http");
var app = express();
const server=http.createServer(app);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRouter=require('./routes/user.router');
const booksRouter=require('./routes/books.router')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/User',userRouter);
app.use('/Books',booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect("mongodb+srv://Username:Password@cluster0.aosm7gu.mongodb.net/?retryWrites=true&w=majority").then((res)=>console.log(`Mongoose connected to the db succesfully ${res}`))
.catch((err)=>
  console.error(`Failed..${err}`))

server.listen(3001,()=>{
  console.log("Express application starting at the port 3001");
})



module.exports = app;
