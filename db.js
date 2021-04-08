const mysql = require("mysql");

var db_info = {
    host: 'localhost',
    port: '5000',
    user: 'root',
    password: 'lico4268',
    database: 'test_db'
}

module.exports = {
    init: function() {
        return mysql.createConnection(db_info);
    },
    connect: function(){

    }
}
