const express = require('express'),
  app = express(),
  routes = require('./routes/index'),
  path = require('path'),
  logger = require('morgan'),
  http = require('http'),
  cookie_parser = require('cookie-parser'),
  { engine } = require ('express-handlebars'),
  cors = require('cors');

  app.set('port', process.env.PORT || 3000);
  app.set('host', process.env.HOST || '127.0.0.1');
  app.use(cors({origin: '*'}));
  app.use(cookie_parser('1234'));
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set("views", "./views");
  app.use('/', routes)

var server = http.createServer(app).listen(app.get('port'),app.get('host'), function(){
  console.log(`Сервер запущен по адресу: http://${app.get('host')}:${app.get('port')}`)
}),
io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
let connections = []
io.sockets.on('connection', function(socket){
console.log("Успешное соединение ")
connections.push(socket);

socket.on('disconnect',function(data){
connections.splice(connections.indexOf(socket),1);
console.log("Успешное отсоединение")
});

socket.on('send mess', function(data){
    var time = new Date();
    io.sockets.emit('add mess', {msg: data.msg, date: time.toLocaleDateString("en-US"), user: data.user});
});
})

app.use(function(req,res,next){
  req.io = io;
  next();
});

//ПОЕХАЛИ!
// app.listen(port, host, () =>
//   console.log(`Сервер запущен по адресу: http://${host}:${port}`)
// )

module.exports = app;