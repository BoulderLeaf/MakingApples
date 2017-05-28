import 'angular';
import uirouter from 'angular-ui-router';
import routing from './enumEditor.routes';
import EnumEditorController from './enumEditor.controller';
import enums from "../../shared/services/Enums.service";

export default angular.module('makingApples.enumEditor', [uirouter, enums])
.config(routing)
.controller('EnumEditorController', EnumEditorController)
.name;