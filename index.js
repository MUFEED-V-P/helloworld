const MongoClient = require("mongodb").MongoClient;
const connection_string = "mongodb://localhost:27017/"
const cors = require("cors");



const express = require('express');
const app = express();

//body parse
var bodyParser = require("body-parser")
//json parser
var jsonParser = bodyParser.json();
//url parser
var urlencodeParser = bodyParser.urlencoded({extended:false});

MongoClient.connect(connection_string,{useUnifiedTopology:true}, (err,client)=>{
    if(err) throw error;
    console.log("connected to mongodb")

    //call the database
    var db = client.db("create");

    //list of documents 
    app.get('/create', function(req,res){
        db.collection("indro").find({}).toArray(function(err,data){
            if (err)throw error
            res.send(data)
        })
    })

    //get single data
    app.get('/create/:name', function(req,res){
        let name = req.params.name;
        db.collection("indro").find({name:name},{projection:{_id:0} }).toArray(function(err,data){
            if (err)throw error
            res.send(data)
        })
    })

    //insert data
    app.post('/create/:insert',jsonParser, function(req,res){
        var qr = { 
            name : req.body.name,
            phone : req.body.phone,
            password : req.body.pswd 
        };

        //let qr = ' insert into indro(name,phone,pswd) values( $name,$phone,$password ) ';
        db.collection("indro").insertOne(qr,function(err,res){
            if(err) throw error;
            console.log("ok")
        })
        

    })

    //update data
    app.patch('/create/:name',jsonParser, function(req,res){
        let name = req.params.name;
        var qr = { 
            name : req.body.name,
            phone : req.body.phone,
            password : req.body.pswd 
        };

        //let qr = ' insert into indro(name,phone,pswd) values( $name,$phone,$password ) ';
        db.collection("indro").updateMany({name:name},qr,function(err,res){
            if(err) throw error;
            console.log("updated")
        })

    })

    //delet data
    app.delete('/create/:name', function(req,res){
        let name = req.params.name;
        db.collection("indro").deleteMany({name:name},function(err,res){
            if(err) throw error;
            console.log("deleted");
        })
    })


    
   
});


app.get('/', function(req, res){
    
    console.log('browser refreshing ...')
    res.send('Hellow World')
    

})



app.listen(3000, function(){
    console.log('Listening to port 3000')
})


