import 'angular';
import uirouter from 'angular-ui-router';
import routing from './createObjects.routes';
import CreateObjectsController from './createObjects.controller';
import creatorObjects from "../../shared/services/CreatorObjects.service";
import enumService from "../../shared/services/Enums.service";

export default angular.module('makingApples.createObjects', [uirouter, creatorObjects, enumService])
.config(routing)
.controller('CreateObjectsController', CreateObjectsController)
.name;