import 'angular';
import uirouter from 'angular-ui-router';
import routing from './creator.routes';
import levelEdit from '../levelEdit';
import CreatorController from './creator.controller';

export default angular.module('makingApples.creator', [uirouter, levelEdit, uirouter])
.config(routing)
.controller('CreatorController', CreatorController)
.name;