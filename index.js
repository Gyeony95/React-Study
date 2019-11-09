const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//test
var fs = require('fs')
app.use('',express.static(__dirname+""));

var mysql = require('mysql');
var connection = mysql.createConnection({                                                                   
  host: 'localhost',
  port:3306,
  user:'root',
  password:'KGH2077kgh!',
  database:'raza'
})
connection.connect();


//소켓세팅
app.set('port', (process.env.PORT || 5000));


app.get('/', function(req, res){
  fs.readFile('index.html', function(error, data){
      if(error){
          console.log(error);
      }else{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
      }
  });
});









//express로 받아들일 url 규칙
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//서버연결하기 직전에뜸
console.log("outside io");

io.on('connection', function(socket){

  //로그인하면 이거 밑에 두개뜸
  console.log('User Conncetion');

  socket.on('connect user', function(user){
    console.log("Connected user ");
    socket.join(user['roomName']);
    console.log("roomName : ",user['roomName']);
    console.log("state : ",socket.adapter.rooms);
    io.emit('connect user', user);
    
  });

  socket.on('connect end', function(data){
    console.log("connect end");
    socket.leave(data['roomName']);
    console.log("leave log :",socket.adapter.rooms);
    io.emit('connect end');
   
  });


  //타이핑중에 이거뜸
  socket.on('on typing', function(typing){
    console.log("Typing.... ");
    io.emit('on typing', typing);
  });


  //메세지 입력하면 서버 로그에 이거뜸
  socket.on('chat message', function(msg){
    console.log("Message " + msg['script']);
    console.log("보내는 메세지 아이디 : ",msg['roomName']);
    io.to(msg['roomName']).emit('chat message', msg);
    //io.emit('chat message', msg);

    //여기다가 db에 저장하는 부분 만들어줄거임
    //connection.query("INSERT INTO razaapp_chat_bubble (roomName, user_one, user_two, name, profile_image, script, date_time, non_read_check) VALUES (msg[roomName], msg[user_one], msg[user_two], msg[name], msg[profile_image], msg[script], msg[date_time], False)");
    connection.query("INSERT INTO razaapp_chat_bubble (roomName, user_one, user_two,user_id, name, profile_image, script, date_time, non_read_check) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?)", [
      msg['roomName']
      , msg['user_one']
      , msg['user_two']
      , msg['user_id']
      , msg['name']
      , msg['profile_image']
      , msg['script']
      , msg['date_time']
      , '0'    ], function(){
      console.log('Data Insert OK');
    });

  });
});

//맨처음에 서버 연결하면 몇번포트에 서버 연결되어있는지 ㅇㅇ
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
