const HomeService = require('../services/home.service')
const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient()
class HomeController {
    async getPage(req, res) {
        return res
            .status(200)
            .render('home', { title: 'Greetings form Handlebars', AllRooms: JSON.stringify(await prisma.chat_room.findMany())})
    }
}
module.exports = new HomeController()
