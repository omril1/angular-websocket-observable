angular.module('app', [])
.controller('mainCtrl', function($scope){
  $scope.audit = 0;
  $scope.original = 0;
  $scope.waitingInterval = 2000;
  var originalObs = Rx.Observable.webSocket("ws://localhost:4000/events").retry(Infinity);
  var auditObs = originalObs.auditTime($scope.waitingInterval) //try throttleTime or debounceTime, with switch instead
  originalObs.subscribe(
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
