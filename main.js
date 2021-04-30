const express = require("express");
const server = express();
const mysql = require("mysql");
const db_config = require('./db.js');
const conn = db_config.init();
const PORT = 5000;

db_config.init();

server.use(express.json());
server.use(express.urlencoded({extended : true}));

server.get('/',(req,res) =>{
    //res.send("hello");
    res.sendFile(__dirname+`/front/main.html`);
})

server.get('/2',(req,res)=>{
    res.sendFile(__dirname+`/front/message.html`);
})

server.post('/req',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
    const userid = req.body.id;
    const message = req.body.message;
    var param= [userid,message];
    if(userid&&message){
        conn.query(`INSERT INTO test_db.user(userid,contents) VALUES(?,?)`,param,function(error,results,field){
            if(error){
                console.log(error);
            }
            console.log(results);
        })
    }
    conn.end;
})

server.listen(PORT);