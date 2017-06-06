import 'angular';
import uirouter from 'angular-ui-router';
import routing from './levelEdit.routes';
import LevelEditController from './levelEdit.controller';
import github from "../../shared/services/GitHub.service";
import enums from "../../shared/services/Enums.service";
import creatorObjects from "../../shared/services/CreatorObjects.service";

export default angular.module('makingApples.levelEdit', [uirouter, github, enums, creatorObjects])
.config(routing)
.controller('LevelEditController', LevelEditController)
.name;