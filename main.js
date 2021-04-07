const express = require("express");
const server = express();
const mysql = require("mysql");
const PORT = 5007;

server.use(express.json());
server.use(express.urlencoded({extended : true}));
server.get('/',(req,res) =>{
    //res.send("hello");
    res.sendFile(__dirname+`/front/main2.html`);
})
server.get('/2',(req,res)=>{
    res.sendFile(__dirname+`/front/main.html`);
    
})
server.post('/req',(req,res)=>{
    res.send(req.body);
    console.log(req.body);
    const {user, message} = req.body;
})

server.listen(PORT);