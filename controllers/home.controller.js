const HomeService = require('../services/home.service')

class HomeController {
    getPage(req, res) {
        return res
            .status(200)
            .render('home', { title: 'Greetings form Handlebars', AllRooms: JSON.stringify(HomeService.getChatRoom())})
    }
}
module.exports = new HomeController()