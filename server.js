var app = require('express')();
var serveStatic = require('serve-static')
var server = require('http').createServer(app);
const WebSocket = require('ws');
app.use(serveStatic('./'));


var counter = 0;
const wss = new WebSocket.Server({ port: 4000 });
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  sendCounterAsync(ws);
});


function sendCounterAsync(ws){
  setTimeout(() => {
    console.log('sending counterAsync ' + counter);
    ws.send(counter++);
    sendCounterAsync(ws);
  }, 2000);
}



server.listen(3000, ()=>{
  console.log('server started at port 3000');
});
