const express = require('express'),
  app = express(),
  routes = require('./routes/index'),
  path = require('path')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const { engine } = require ('express-handlebars');

// подключаем статические файлы
app.use(express.static(path.join(__dirname, 'public')))

// че эт?
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// подключаем шаблоны
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

// юзаем роуты
app.use('/', routes)

// app.get('/',(req,res)=>{
//   res.render('home')
// })

//ПОЕХАЛИ!
app.listen(port, host, () =>
  console.log(`Сервер запущен по адресу: http://${host}:${port}`)
)
