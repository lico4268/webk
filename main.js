const express = require("express");
const server = express();
const mysql = require("mysql");
const db_config = require('./db.js');
const conn = db_config.init();
const ejs = require("ejs")
const PORT = 5000;

db_config.init();

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.urlencoded({extended : true}));

server.get('/',(req,res) =>{
    //res.send("hello");
    res.render('main')
})

server.get('/2',(req,res)=>{
    //res.sendFile(__dirname+`/front/message.html`);
    res.render('message')
})

server.post('/req',(req,res)=>{
    console.log(req.body);
    const userid = req.body.id;
    const message = req.body.message;
    if(userid&&message){
        conn.query(`INSERT IGNORE INTO test_db.user(userid,contents) VALUES(?,?)`,[userid,message],function(error,results,field){
            if(error){
                console.log(error);
                res.json({err:1})
            }
            console.log(results);
            res.json({status:1})
        })
    }
    //else res.send({status:0})
    else if(!userid) {
        res.json({status:2})
        console.log("id NULL")
    }
    else if(!message){
        res.json({status:3})
        console.log("message NULL")
    }
    conn.end;
})

server.get('/view',(req,res)=>{
    console.log("view pages");
    res.render('showmsg');
})

server.post('/view/message',(req,res)=>{
    
})

/*
server.get('/3',(req,res)=>{
    console.log("ejs pages");
    res.render('1');
})
*/
server.listen(PORT);