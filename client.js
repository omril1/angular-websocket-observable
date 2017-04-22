var RECONNECT_DELAY = 2000;

angular.module('app', [])
.controller('mainCtrl', function($scope){
  $scope.text = 'hello world!';
  var socket = new WebSocket("ws://localhost:4000/events");
  socket.onmessage = function(event) {
    console.log(event);
    var msg = JSON.parse(event.data);
    $scope.$apply(()=>{
      $scope.text = msg;
    })
  }

  socket.onerror = (event) => {
    console.log('webSocket.onerror event', event);

    setTimeout(() => {

    }, RECONNECT_DELAY);
  };

  socket.onopen = (event) => {
    console.log(event);
    socket.send('hello there');
  }

  socket.onclose = (event) => {
    console.log(event);

    if (event.code == 1001) {
      setTimeout(() => {

      }, RECONNECT_DELAY);
    }
  };
})
