

const MongoClient = require("mongodb");
const connection_string = "mongodb://localhost:27017/"

MongoClient.connect(connection_string,{useUnifiedTopology:true}, (err,client)=>{
    if(err) throw error;
    console.log("connected to mongodb")
    client.close();
});

