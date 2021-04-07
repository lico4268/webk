const express = require("express");
const server = express();
const mysql = require("mysql");
const PORT = 5007;

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
})

server.listen(PORT);