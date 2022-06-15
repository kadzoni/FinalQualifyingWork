const express = require('express'),
  app = express(),
  routes = require('./routes/index'),
  path = require('path'),
  logger = require('morgan'),
  cookie_parser = require('cookie-parser');
app.use(cookie_parser('1234'))
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const io = require('socket.io')(app.listen(port));
const { engine } = require ('express-handlebars');

// подключаем статические файлы
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// подключаем шаблоны
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

let users = [],
connections = []
io.sockets.on('connection', function(socket){
console.log("Успешное соединение")
connections.push(socket);
socket.on('disconnect',function(data){
  connections.splice(connections.indexOf(socket),1);
  console.log("Успешное отсоединение")
});

socket.on('send mess', function(data){
    var time = new Date();
    io.sockets.emit('add mess', {msg: data.msg, date: time.toLocaleDateString("en-US"), user: data.user});
//   req.socket.broadcast.emit('add mess', {msg: data+"re"});
});
})

app.use(function(req,res,next){
  req.io = io;
  next();
});

// юзаем роуты
app.use('/', routes)

//ПОЕХАЛИ!
app.listen(port, host, () =>
  console.log(`Сервер запущен по адресу: http://${host}:${port}`)
)

module.exports = app;