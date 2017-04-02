import angular from 'angular';

class makingApplesService {
  constructor() {
    this.names = ['John', 'Elisa', 'Mark', 'Annie'];
  }

  getName() {
    const totalNames = this.names.length;
    const rand = Math.floor(Math.random() * totalNames);
    return this.names[rand];
  }
}

export default angular.module('services.makingApplesService', [])
  .service('makingApplesService', makingApplesService);