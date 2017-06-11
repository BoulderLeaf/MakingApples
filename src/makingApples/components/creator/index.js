import 'angular';
import tabs from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';
import routing from './creator.routes';
import levelEdit from '../levelEdit';
import CreatorController from './creator.controller';
import github from "../../shared/services/GitHub.service";
import levelRegistry from "../../shared/services/LevelRegistry.service";

export default angular.module('makingApples.creator', [uirouter,tabs, levelEdit, github, levelRegistry])
.config(routing)
.controller('CreatorController', CreatorController)
.name;