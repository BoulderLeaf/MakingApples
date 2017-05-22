import 'angular';
import uirouter from 'angular-ui-router';

import routing from './makingApples.config';
import home from './components/home';

import creatorObjects from './components/createObjects';
import creator from './components/creator';
import header from './components/header';

angular.module('makingApples', [uirouter, home, creator, creatorObjects])
  .config(routing);