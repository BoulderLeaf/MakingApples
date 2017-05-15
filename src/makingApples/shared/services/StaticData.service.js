import angular from 'angular';

class StaticData {
  constructor() {
    this.GHUserName = 'colincove';
      this.GHRepo = 'colincove';
      this.GHPassword = 'colincove';
  }

  getName() {
    return this.name;
  }
}

export default angular.module('services.static-data', [])
  .service('staticData', StaticData)
  .name;