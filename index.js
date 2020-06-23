const express = require('express');

const app = express();

app.get('/', function(req, res){
    
    console.log('browser refreshing ...')
    res.send('Hellow World')

})

app.listen(3000, function(){
    console.log('Listening to port 3000')
})

