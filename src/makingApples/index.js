import 'angular';

import makingApplesController from './makingApples.controller.js';
import makingApplesService from './makingApples.service.js';

import creator from './components/creator/';

export default angular.module('makingApples', [])
.controller('makingApplesController', makingApplesController)
.factory('makingApples', makingApplesService);