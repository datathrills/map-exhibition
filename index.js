var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fs = require('fs');

const contents = fs.readFileSync("data/data.json");
const dataContents = JSON.parse(contents);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    //res.sendFile(__dirname + '/index.html');
    res.render('map', {data: dataContents})
});

app.get('/projector', function(req, res){
    res.sendFile(__dirname + '/projector.html');
})

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('data', function(dataObject){
        io.emit('server_data', dataObject);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});