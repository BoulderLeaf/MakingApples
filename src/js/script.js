import 'jquery';
import 'angular';
import accordion from 'angular-ui-bootstrap/src/accordion';
import "../less/style.less";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
var EditName =  require('../../src/js/angular_apps/MakingApplesHeader/controllers/EditName.js');

var MakeApplesScene = angular.module('MakeApplesScene',[]);

MakeApplesScene.controller('EditController', ['$scope', function($scope) {
  $scope.name = 'Hola!';
}]);