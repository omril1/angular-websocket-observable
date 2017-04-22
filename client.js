angular.module('app', [])
.controller('mainCtrl', function($scope){
  $scope.audit = 0;
  $scope.original = 0;
  var socketObserveable = Rx.Observable.webSocket("ws://localhost:4000/events");
  var auditObs = socketObserveable.auditTime(1000)
  socketObserveable.subscribe(
    function (data) {
      $scope.$apply(()=>{
        $scope.original = data;
        $scope.time = Date.now();
      });
    },
    function (error) {
        console.log('error', error);
    },
    function () {
        console.log('finished');
    });
  auditObs.subscribe(
    function (data) {
      $scope.$apply(()=>{
        $scope.audit = data;
        $scope.timeDiff = Date.now() - $scope.time;
      });
    },
    function (error) {
        console.log('error', error);
    },
    function () {
        console.log('finished');
    });
})
