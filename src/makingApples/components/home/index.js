import 'angular';
import uirouter from 'angular-ui-router';
import routing from './home.routes';
import HomeController from './home.controller';
import github from "../../shared/services/GitHub.service";

export default angular.module('makingApples.home', [uirouter, github])
.config(routing)
.controller('HomeController', HomeController)
.name;