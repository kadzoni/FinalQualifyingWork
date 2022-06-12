const HomeService = require('../services/home.service')
const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient()
class HomeController {
    async getMainPage(req, res) {
        if (!req.signedCookies.email){
            return res
            .status(200)
            .render('home', { title: 'Main', AllRooms: await prisma.chat_room.findMany(), style: 'main'})
        }else{
            return res
            .status(200)
            .render('home', { title: 'Main', AllRooms: await prisma.chat_room.findMany(), style: 'main', reg: `Привет ${req.signedCookies.email}`})
        }
    }
    async getSingInPage(req,res) {
        return res
            .status(200)
            .render('sign-in', { title: 'Greetings form Handlebars', style: 'sing-in'})
    }
    async getChatRoom(req, res){
        req.params["roomName"]
        return res
        .status(200)
        .render('sign-in', { title: 'Greetings form Handlebars', style: 'sing-in'})
    }
}
module.exports = new HomeController()
