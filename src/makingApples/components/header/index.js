import 'angular';
import uirouter from 'angular-ui-router';
import routing from './header.routes';
import HeaderController from './header.controller';
import github from '../../shared/services/GitHub.service';
import staticData from '../../shared/services/StaticData.service';

export default angular.module('makingApples.header', [uirouter, github, staticData])
.config(routing)
.controller('HeaderController', HeaderController)
.name;