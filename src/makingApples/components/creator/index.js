import 'angular';
import uirouter from 'angular-ui-router';
import controller from './creator.controller.js';
import service from './creator.service.js';
import routing from './creator.routes.js';

export default angular.module('creator', [uirouter])
.config(routing)
.controller('creatorController', controller)
.factory('creatorService', service);