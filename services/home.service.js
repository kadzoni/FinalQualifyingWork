const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USERNAME || "root",
  database: process.env.DB_DATABASE="chatdatabase",
}).promise();;

class HomeService{
    getChatRoom(){
        const sql = `SELECT * FROM chat_room`;
        return connection.query(sql).then(result =>{
            console.log(result);
            connection.end();
          })
          .catch(err =>{
            console.log(err);
            connection.end();
          });
    }
}

module.exports = new HomeService()