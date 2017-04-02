module.exports = function()
{
    var MakeApplesHeader = require("../MakeApplesHeader.js");

    return MakeApplesHeader.controller('HeaderController', ['$scope', function($scope) {
      $scope.appName = 'Maming Apples!!!!!!';
}]);
}.call();