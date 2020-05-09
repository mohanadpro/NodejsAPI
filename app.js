var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors=require('cors');
var mongoose=require('mongoose');


var productsRouter=require('./routes/products');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));

// mohanad if I want to use options in the cors like white list that are abled to call my server
// var corsWhiteList=['website1.com','website2.com']
// var corsOptions={
//   origin:function(origin,callback)
//   {
//     if(corsWhiteList.indexOf(origin)!==-1)
//     {
//       callback(null,true)
//     }
//     else
//     {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));

// mohanad it must user before the routing to let the server knows if the called server allows to call API or not
app.use(cors());

// mohanad mongoose must be declared before the routing 
mongoose.connect('mongodb://localhost/ShoppingCartAPI',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log('connecting to mongo db has been done successfully ....')
  }
});

// mohanad to use body parser

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/users', usersRouter);
app.use('/products',productsRouter);

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

  // mohanad
  res.json({
    message:err.message
  })
});

module.exports = app;
