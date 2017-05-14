import 'angular';
import uirouter from 'angular-ui-router';
import routing from './levelEdit.routes';
import LevelEditController from './levelEdit.controller';

export default angular.module('makingApples.levelEdit', [uirouter])
.config(routing)
.controller('LevelEditController', LevelEditController)
.name;