const express = require("express");
const app = express();
const mysql = require("mysql");
const router = express.Router();
const db_config = require('./db.js');
const conn = db_config.init();
const ejs = require("ejs")
const PORT = 5000;

db_config.init();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/',(req,res) =>{
    //res.send("hello");
    res.render('main')
})

app.get('/2',(req,res)=>{
    //res.sendFile(__dirname+`/front/message.html`);
    res.render('message')
})

app.post('/req',(req,res)=>{
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

app.post('/req/check',(req,res)=>{
    const userid = req.body.id;
    console.log(req.body.id)
    var sql ="SELECT * FROM test_db.user WHERE userid = ? "
    conn.query(sql,[userid],function(err,rows,field){
        if(err){
            console.log(err)
        }
        //res.send(data)
        console.log(rows)
        if(rows.length>0){
            res.json({dstatus : 1})
        }
        else res.json({dstatus : 0})
    })
})

app.get('/view',(req,res)=>{
    console.log("view pages");
    res.render('showmsg');
    res.end();
})

app.post('/view',(req,res)=>{
    const requestId = req.body.userid
    var sql ="SELECT * FROM test_db.user WHERE userid = ?"
    conn.query(sql,[requestId],function(err,rows,field){
        if(err){
            console.log(err)
        }
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

app.get('/reply',(req,res)=>{
    res.render('reply')
    res.end()
})

app.post('/reply',(req,res)=>{
    var sqlcnt = "SELECT COUNT(*) as cnt FROM test_db.user"
    conn.query(sqlcnt,function(err,result){
        console.log(result)
        res.json(result)
    })
    var rand = Math.random()
})

app.post('/reply/view',(req,res)=>{
    var sql ="SELECT * FROM test_db.user WHERE num = ?"
    var rand = Math.random()
    console.log(req.body.maxnum)
    //conn.query(sql,)
})

/*
app.get('/3',(req,res)=>{
    console.log("ejs pages");
    var sql ="SELECT * FROM test_db.user WHERE userid = ?"
    var param = ['asdf'];
    conn.query(sql,param,function(err,rows,field){
        res.send(rows)
        if(rows.length>0){
            console.log(rows.length)
            console.log(rows[2])
        }
        else console.log("목록이 없음")

    })
    
})
*/

app.listen(PORT);