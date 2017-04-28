var app = require('express')();
var serveStatic = require('serve-static')
var server = require('http').createServer(app);
const WebSocket = require('ws');
app.use(serveStatic('./'));


const wss = new WebSocket.Server({ port: 4000 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  var counter = 0;
  sendCounterAsync(ws, counter);
});

var velocity = 100;
function sendCounterAsync(ws, counter){
  // var interval = velocity;
  var interval = Math.pow(Math.sin(counter * Math.PI / 180),2) * velocity + velocity;
  // var interval =  Math.random() * velocity + velocity;
  console.log('interval: ', interval);
  setTimeout(() => {
    console.log('sending counterAsync ' + counter);
    if (ws.readyState == ws.OPEN) {
      ws.send(counter++);
      sendCounterAsync(ws, counter);
    }
}, interval);
}



server.listen(3000, ()=>{
  console.log('server started at port 3000');
});
