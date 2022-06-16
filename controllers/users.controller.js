const UsersService = require('../services/users.service')
const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient()
const bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken')
const url = require('node:url')
class UsersController {
  async signOut(req,res){
    console.log('Чистим куку в singuot')
    return res
    .clearCookie('email', {signed: true})
    .redirect('/')
  }
  async createUser(req, res) {
    new Promise(function(resolve, reject) {
      let result = prisma.users.findMany({
        where: { email: req.users.email },
        select: {
          email: true,
          password: true,
        },
      })
      setTimeout(() => resolve(result), 1000);
    }).then(function(result){
      if (result.length == 0){
        console.log('зареган '+ result[0]+ ' ' + req.users.email)
        let salt = bcrypt.genSaltSync(15),
            password = bcrypt.hashSync(req.users.password, salt)
          prisma.users.create({
            data: {
              email: req.users.email,
              password: password,
            }
          }).then(function(){
            return prisma.chat_room.findMany()
          }).then(function(AllRooms){
            return res
            .redirect("/")
          })
      }else{
        console.log(req.signedCookies.email)
        if(!req.signedCookies.email){
          if(bcrypt.compareSync(req.users.password,result[0].password)){
            console.log(process.env.JWT)
            console.log(req.signedCookies.email)
            return prisma.chat_room.findMany().then(function(AllRooms){
              return res             
              .cookie('email', result[0].email, {signed: true})
              .redirect('/')
            })
          }else{
            return res
            .status(200)
            .render('sign-in', { title: 'Sing-up', style: 'sing-in', reg: "Неправильный пароль"})
          }
        }else{
          this.signOut()
        }
      }
    })
  }
}

module.exports = new UsersController()