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
    async getDocsPage(req,res){
        return res
            .status(200)
            .render('docs', { style: 'docs', userName: `${req.signedCookies.email}`})
    }
    async getChatRoom(req, res){
        return res
        .setHeader('Access-Control-Allow-Origin', '*')
        .status(200)
        .render('room', { 
            AllRooms: await prisma.chat_room.findMany(), 
            style: 'chatroom',
            styleLvlTwo: '../',
            userName: `${req.signedCookies.email}`,
            roomName: req.params["roomName"],
            AllMassage: await prisma.massage.findMany({
                where: {nameRoom: req.params["roomName"]},
                orderBy: {created_at: 'asc'}, 
            })
        })
    }
    async ioshechka(req,res){
        console.log(req.body.msg)
        console.log(req.body.room)
        if(typeof req.body.msg == "undefined" || typeof req.body.room == "undefined"){
            console.log('Чет не то')
            return res             
                .redirect('/')
        }else{
            await prisma.massage.create({
                data: {
                    userLogin: req.signedCookies.email,
                    nameRoom: req.body.room,
                    massage: req.body.msg,
                },
            })
        }
    }
}
module.exports = new HomeController()
