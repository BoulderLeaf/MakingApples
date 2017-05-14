import angular from 'angular';
import staticData from './StaticData.service';

class GutHub {
  constructor(staticData) {
      this.staticData = staticData;
  }

  put(url) {
    //TODO: Put into repo
  }
    
get(url) {
    //TODO: get from repo
  }
}

export default angular.module('services.github', [staticData])
  .service('github', GutHub)
  .name;