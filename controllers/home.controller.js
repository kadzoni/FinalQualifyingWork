const HomeService = require('../services/home.service')
const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient()
class HomeController {
    async getMainPage(req, res) {
        if (!req.signedCookies.email){
            return res
            .status(200)
            .render('home', { 
                title: 'Main', 
                AllRooms: await prisma.chat_room.findMany(), 
                style: 'main'
            })
        }else{
            return res
            .status(200)
            .render('home', { 
                title: 'Main', 
                AllRooms: await prisma.chat_room.findMany(), 
                style: 'main', 
                userName: `${req.signedCookies.email}`
        })
        }
    }
    async getSingInPage(req,res) {
        return res
            .status(200)
            .render('sign-in', { style: 'sing-in'})
    }
    async getChatRoom(req, res){
        
        console.log(req.params["roomName"])

        return res
        .status(200)
        .render('room', { 
            AllRooms: await prisma.chat_room.findMany(), 
            style: 'chatroom',
            styleLvlTwo: '../',
            userName: `${req.signedCookies.email}`,
            roomName: req.params["roomName"]
        })
    }
}
module.exports = new HomeController()
