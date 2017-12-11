var myApp = angular.module('myApp', []);
myApp.controller('TodoCtrl', ['$scope', function ($scope){

    $scope.text = 'Hello Angular fanatic.';
}]);