const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient()
class UsersService {
  getUsers(data) {
        return data
  }

  createUser(data) {
    return new Promise((res, rej) => {
      fs.writeFile(
        'data.json',
        JSON.stringify(data),
        (err, response) => {
          if (err) return res(false)

          return res({ message: 'User created.' })
        }
      )
    })
  }
}

module.exports = new UsersService()