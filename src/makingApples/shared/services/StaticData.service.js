import angular from 'angular';

class StaticData {
  constructor() {
    this.names = 'name';
  }

  getName() {
    return this.name;
  }
}

export default angular.module('services.static-data', [])
  .service('staticData', StaticData)
  .name;