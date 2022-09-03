const mysql = require('mysql');
const { promisify }  = require('util');

const connection = mysql.createPool({
    host: 'localhost',
    // user: 'admin',
    // password: 'adminpass',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

connection.getConnection(
    (err, con) => {
        if(con){
            console.log('BD conectada');
        }
        if(err){
            console.log('BD no conectada');
        }
    }
);

connection.query = promisify(connection.query);

module.exports = connection;