import 'angular';
import uirouter from 'angular-ui-router';
import routing from './levelEdit.routes';
import LevelEditController from './levelEdit.controller';
import enums from "../../shared/services/Enums.service";
import creatorObjects from "../../shared/services/CreatorObjects.service";
import fabricParse from "../../shared/services/FabricParse.service";
import levels from "../../shared/services/Levels.service";
import levelRegistry from "../../shared/services/LevelRegistry.service";
import config from "../../shared/services/Config.service";

export default angular.module('makingApples.levelEdit', [uirouter, enums, creatorObjects, fabricParse, levels, levelRegistry, config])
.config(routing)
.controller('LevelEditController', LevelEditController)
.name;