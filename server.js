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


function sendCounterAsync(ws, counter){
  var interval = Math.sin(counter * Math.PI * 5 / 180)*1000 + 1000;
  // var interval =  Math.random()*1000 + 1000;
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
